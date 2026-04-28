import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getCache, setCache } from '@/lib/cache';

export const maxDuration = 60; // Allow up to 60 seconds for Vercel Hobby tier

// Using @google/genai for Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Strict backend IP-based rate limiter (max 3 requests per 24 hours)
const ipRateLimitMap = new Map();

function checkIpRateLimit(ip) {
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') return true; 
  
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  
  const record = ipRateLimitMap.get(ip);
  if (!record) {
    ipRateLimitMap.set(ip, { count: 1, firstRequest: now });
    return true;
  }
  
  if (now - record.firstRequest > ONE_DAY) {
    ipRateLimitMap.set(ip, { count: 1, firstRequest: now });
    return true;
  }
  
  if (record.count >= 10) {
    return false;
  }
  
  record.count += 1;
  return true;
}

function extractYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
}

function parseDuration(isoDuration) {
  if (!isoDuration) return { human: "Unknown", totalSeconds: 0 };
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { human: isoDuration, totalSeconds: 0 };
  const h = match[1] ? parseInt(match[1]) : 0;
  const m = match[2] ? parseInt(match[2]) : 0;
  const s = match[3] ? parseInt(match[3]) : 0;
  
  let result = [];
  if (h > 0) result.push(`${h} hours`);
  if (m > 0) result.push(`${m} minutes`);
  if (s > 0) result.push(`${s} seconds`);
  
  const totalSeconds = h * 3600 + m * 60 + s;
  return { human: result.join(' ') || "0 seconds", totalSeconds };
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
    
    if (!checkIpRateLimit(ip)) {
      return NextResponse.json({ error: 'Limit reached. Come back tomorrow!' }, { status: 429 });
    }

    const body = await req.json();
    const { url, frames, fileName } = body;

    if (!url && !frames) {
      return NextResponse.json({ error: 'URL or Video Frames are required' }, { status: 400 });
    }

    let title, thumbnailUrl, videoId, prompt, geminiContents;

    if (frames) {
      // --- LOCAL VIDEO LOGIC ---
      videoId = "local_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      title = fileName || "Local Video Upload";
      thumbnailUrl = "/icon.jpg"; // Placeholder or we could use the first frame
      
      const contents = frames.map(f => ({
        inlineData: {
          data: f.image,
          mimeType: 'image/jpeg'
        }
      }));
      
      const timecodesList = frames.map(f => f.timecode).join(', ');
      
      prompt = `You are an expert AI Video Prompt Engineer. I am providing you with sequential frames extracted exactly every 8 seconds from a video. Your job is to analyze each frame and generate a highly detailed, copy-paste ready text prompt to recreate that exact visual style, subject, and camera angle. You MUST format your output strictly divided by these 8-second blocks. Do not merge scenes. Provide the output as: ${frames[0]?.timecode || '[00:00 - 00:08]'}: \n ... etc.

The frames correspond sequentially to these timecodes: ${timecodesList}.

Output must be a structured JSON containing EXACTLY these 3 keys:
1. "scenes": An array of objects. Each object MUST have these exact keys: "time_code" (use exactly the timecodes provided, e.g. "[00:00 - 00:08]"), "camera_move" (e.g. "Static high-angle"), "scene" (setting description), "characters" (description of people/subjects), "actions" (what is happening). Ensure you generate exactly one scene per timecode block provided.
2. "aspect_ratio": "9:16 or 16:9"
3. "aesthetic_tags": ["tag1", "tag2", "tag3"]`;

      geminiContents = [ prompt, ...contents ];

    } else {
      // --- YOUTUBE URL LOGIC ---
      videoId = extractYouTubeId(url);
      if (!videoId) {
        return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
      }

      const cachedResult = getCache(videoId);
      if (cachedResult) {
        return NextResponse.json({ result: cachedResult, cached: true, videoId });
      }

    const ytApiKey = process.env.YOUTUBE_API_KEY;
    if (!ytApiKey) throw new Error('YouTube API Key missing');

    const ytUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${ytApiKey}`;
    const ytRes = await fetch(ytUrl);
    const ytData = await ytRes.json();

    if (!ytData.items || ytData.items.length === 0) {
      return NextResponse.json({ error: 'Video not found or private' }, { status: 404 });
    }

    const snippet = ytData.items[0].snippet;
    const title = snippet.title;
    const description = snippet.description;
    
    const durationIso = ytData.items[0].contentDetails?.duration;
    const durationInfo = parseDuration(durationIso);
    const humanDuration = durationInfo.human;
    const totalSeconds = durationInfo.totalSeconds;
    
    const thumbnails = snippet.thumbnails;
    const thumbnailObj = thumbnails.maxres || thumbnails.high || thumbnails.medium || thumbnails.default;
    const thumbnailUrl = thumbnailObj?.url;

    if (!thumbnailUrl) {
      throw new Error('Could not find video thumbnail');
    }

    const imgRes = await fetch(thumbnailUrl);
    if (!imgRes.ok) throw new Error('Failed to download thumbnail');
    const arrayBuffer = await imgRes.arrayBuffer();
    
    const imagePart = {
      inlineData: {
        data: Buffer.from(arrayBuffer).toString("base64"),
        mimeType: imgRes.headers.get('content-type') || 'image/jpeg'
      }
    };

      prompt = `Analyze this video based on its thumbnail, title, and description.
Title: ${title}
Description: ${description}
Actual Video Duration: ${humanDuration} (${totalSeconds} total seconds)

CRITICAL RULE: The video is EXACTLY ${totalSeconds} seconds long. Your generated "time_code" values MUST NOT exceed ${totalSeconds} seconds under any circumstances! The final scene's end time MUST be less than or equal to the video's total duration. For example, if the video is 8 seconds, the maximum timecode is 00:08. DO NOT hallucinate extra time.

Based on its visual style, lighting, and elements, create a detailed, simulated storyboard breakdown for AI video/image generation. Since you only have the thumbnail, imagine scenes that would accurately fit into this ${humanDuration} video.
Also, accurately determine the aspect ratio of the video (e.g., output "9:16" if it's a vertical/Shorts video, or "16:9" if it's a standard landscape video).

Output must be a structured JSON containing EXACTLY these 3 keys:
1. "scenes": An array of objects representing the imagined scenes. Each object MUST have these exact keys: "time_code" (e.g. "00:00-00:02", MUST NOT exceed ${humanDuration}), "camera_move" (e.g. "Static high-angle"), "scene" (setting description), "characters" (description of people/subjects), "actions" (what is happening).
2. "aspect_ratio": "9:16 or 16:9"
3. "aesthetic_tags": ["tag1", "tag2", "tag3"]`;

      geminiContents = [ prompt, imagePart ];
    }

    let response;
    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];
    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            response = await ai.models.generateContent({
                model: modelName,
                contents: geminiContents,
                config: { responseMimeType: "application/json" }
            });
            break;
        } catch (err) {
            lastError = err;
            console.error(`Model ${modelName} failed:`, err.message);
            if (err.message.includes('429') || err.message.includes('503')) {
                continue;
            } else {
                throw err;
            }
        }
    }

    if (!response) {
        throw new Error(`AI servers are too busy. Please try again later.`);
    }

    const aiResponseText = response.text;
    let structuredData;
    try {
        structuredData = JSON.parse(aiResponseText);
    } catch (e) {
        throw new Error('Gemini returned invalid JSON');
    }

    const finalResult = {
      title,
      thumbnailUrl,
      analysis: structuredData
    };

    if (!frames) {
      setCache(videoId, finalResult);
    }

    return NextResponse.json({ result: finalResult, cached: false, videoId });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
