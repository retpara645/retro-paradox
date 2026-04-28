'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading
  const [usages, setUsages] = useState(0);
  const [inputMethod, setInputMethod] = useState('youtube'); // 'youtube' or 'local'
  const [localFile, setLocalFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState('');

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { // 20MB
      setToast('File too large. Please upload a short clip (Max 20MB).');
      setTimeout(() => setToast(''), 3000);
      setLocalFile(null);
      return;
    }
    if (!file.type.startsWith('video/')) {
      setToast('Please upload a valid video file.');
      setTimeout(() => setToast(''), 3000);
      setLocalFile(null);
      return;
    }
    setLocalFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const extractFrames = async (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;

      video.onloadedmetadata = async () => {
        const duration = video.duration;
        const frames = [];
        const canvas = document.createElement('canvas');
        
        for (let t = 0; t < duration; t += 8) {
          await new Promise((res) => {
            video.currentTime = t;
            video.onseeked = () => {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              const start = Math.floor(t);
              const end = Math.min(Math.floor(t + 8), Math.floor(duration));
              
              const formatTime = (seconds) => {
                const m = Math.floor(seconds / 60).toString().padStart(2, '0');
                const s = Math.floor(seconds % 60).toString().padStart(2, '0');
                return `${m}:${s}`;
              };
              
              const timecode = `[${formatTime(start)} - ${formatTime(end)}]`;
              
              let scale = 1;
              if (canvas.width > 640) {
                 scale = 640 / canvas.width;
              }
              const thumbCanvas = document.createElement('canvas');
              thumbCanvas.width = canvas.width * scale;
              thumbCanvas.height = canvas.height * scale;
              thumbCanvas.getContext('2d').drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);
              
              const base64 = thumbCanvas.toDataURL('image/jpeg', 0.6).split(',')[1];
              
              frames.push({ timecode, image: base64 });
              res();
            };
          });
        }
        
        URL.revokeObjectURL(video.src);
        resolve(frames);
      };
      
      video.onerror = (e) => reject("Failed to load video file.");
    });
  };

  useEffect(() => {
    const savedUsages = localStorage.getItem('retpara_usages');
    if (savedUsages) {
      setUsages(parseInt(savedUsages));
    }
  }, []);

  const handleAnalyze = async () => {
    if (inputMethod === 'youtube' && !url) {
      alert('Please enter a YouTube URL.');
      return;
    }
    if (inputMethod === 'local' && !localFile) {
      alert('Please upload a video file first.');
      return;
    }

    if (usages >= 10) {
      alert('Limit Reached: You have used all 10 free prompts for today.');
      return;
    }

    setStatus('loading');

    const newUsages = usages + 1;
    setUsages(newUsages);
    localStorage.setItem('retpara_usages', newUsages.toString());

    try {
      let requestBody;
      
      if (inputMethod === 'local') {
        setStatus('extracting');
        const frames = await extractFrames(localFile);
        setStatus('loading');
        requestBody = { frames, fileName: localFile.name };
      } else {
        requestBody = { url };
      }

      // 8-Second Ad Timer (visual feedback)
      const loadingPromise = new Promise(resolve => setTimeout(resolve, 8000));
      
      const fetchPromise = fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }).then(res => res.json());

      const [_, data] = await Promise.all([loadingPromise, fetchPromise]);

      if (data.error) {
        alert("Error: " + data.error);
        setStatus('idle');
      } else {
        localStorage.setItem(`retpara_result_${data.videoId}`, JSON.stringify(data.result));
        window.location.href = `/result/${data.videoId}`;
      }
    } catch (err) {
      alert("Error processing video: " + err);
      setStatus('idle');
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFF00] p-4 flex flex-col items-center justify-center font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      
      <h1 className="text-5xl md:text-8xl font-bangers tracking-widest text-white mb-6 transform -rotate-1 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black] text-center">
        RETRO PARADOX
      </h1>

      <div className="w-full max-w-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-5 sm:p-8 md:p-12 flex flex-col gap-4 md:gap-6 relative">
        
        {status === 'idle' ? (
          <>
            {toast && (
              <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 bg-[#FF0000] text-white font-black px-6 py-3 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] z-50 whitespace-nowrap">
                {toast}
              </div>
            )}

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black text-center mb-4 leading-tight">
              DROP A VIDEO AND WATCH THE AI GENERATE A PROMPT BASED ON ITS VIBE!
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4">
              <button 
                onClick={() => setInputMethod('youtube')}
                className={`flex-1 py-3 font-black text-base md:text-lg border-4 border-black transition-all ${inputMethod === 'youtube' ? 'bg-[#FFFF00] shadow-[4px_4px_0_rgba(0,0,0,1)]' : 'bg-white hover:bg-gray-100'}`}
              >
                YOUTUBE URL
              </button>
              <button 
                onClick={() => setInputMethod('local')}
                className={`flex-1 py-3 font-black text-base md:text-lg border-4 border-black transition-all ${inputMethod === 'local' ? 'bg-[#FFFF00] shadow-[4px_4px_0_rgba(0,0,0,1)]' : 'bg-white hover:bg-gray-100'}`}
              >
                UPLOAD VIDEO
              </button>
            </div>

            {inputMethod === 'youtube' ? (
              <input 
                type="text"
                placeholder="HTTPS://YOUTU.BE/..."
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xl outline-none focus:bg-gray-100 transition-colors placeholder-gray-300 w-full mb-2"
              />
            ) : (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full h-40 border-4 border-dashed border-[#002366] relative flex flex-col items-center justify-center cursor-pointer transition-colors mb-2 ${isDragging ? 'bg-[#3b82f6]/20' : 'bg-[#e0f2fe]'}`}
                style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              >
                <input 
                  type="file" 
                  accept="video/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={handleFileChange}
                />
                <div className="text-center font-mono text-[#002366] font-bold z-10 pointer-events-none p-3 sm:p-4 bg-white/80 border-2 border-[#002366] shadow-[2px_2px_0_rgba(0,35,102,1)] mx-4">
                  {localFile ? (
                    <p className="text-sm sm:text-lg truncate max-w-xs">📄 {localFile.name}</p>
                  ) : (
                    <>
                      <p className="text-lg sm:text-xl mb-1">📁 DRAG & DROP</p>
                      <p className="text-[10px] sm:text-xs">OR CLICK TO BROWSE (MAX 20MB)</p>
                    </>
                  )}
                </div>
              </div>
            )}

            <button 
              onClick={handleAnalyze}
              disabled={inputMethod === 'youtube' ? !url : !localFile}
              className="w-full bg-[#FF0000] text-white font-black text-2xl sm:text-3xl md:text-4xl py-4 sm:py-5 mt-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              GENERATE PROMPT!
            </button>

            <div className="mt-8 md:mt-10 bg-white border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] md:shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-2xl md:rounded-3xl relative">
              <div className="absolute top-[-16px] md:top-[-20px] left-4 md:left-6 bg-[#002366] text-[#FFFF00] font-black text-sm sm:text-lg md:text-xl px-4 md:px-6 py-1 md:py-2 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] transform -rotate-2 whitespace-nowrap">
                HOW TO USE? ⚡
              </div>
              <ul className="flex flex-col gap-4 md:gap-5 font-mono text-[11px] sm:text-xs md:text-base font-bold text-black mt-4 md:mt-4">
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="bg-[#FFFF00] border-2 border-black px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0_rgba(0,0,0,1)] md:shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm md:text-xl rounded-md flex-shrink-0">1</span> 
                  <span className="mt-0.5 md:mt-1 leading-relaxed"><strong>CHOOSE SOURCE:</strong> Paste a public YouTube Link <strong>OR</strong> upload a local video clip directly from your device (Max 20MB).</span>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="bg-[#FFFF00] border-2 border-black px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0_rgba(0,0,0,1)] md:shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm md:text-xl rounded-md flex-shrink-0">2</span> 
                  <span className="mt-0.5 md:mt-1 leading-relaxed"><strong>AI EXTRACTION:</strong> Our system strictly extracts one frame every 8 seconds. The AI then deeply analyzes the vibe, characters, actions, and lighting of each frame.</span>
                </li>
                <li className="flex items-start gap-3 md:gap-4">
                  <span className="bg-[#FFFF00] border-2 border-black px-2 md:px-3 py-0.5 md:py-1 shadow-[2px_2px_0_rgba(0,0,0,1)] md:shadow-[4px_4px_0_rgba(0,0,0,1)] text-sm md:text-xl rounded-md flex-shrink-0">3</span> 
                  <span className="mt-0.5 md:mt-1 leading-relaxed"><strong>COPY & CREATE:</strong> You get a detailed, 8-second segmented prompt block. Just click "COPY PROMPT!" and paste it into your favorite AI Video Generator!</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-6">
            <h2 className="text-4xl md:text-5xl font-black text-black drop-shadow-[2px_2px_0_rgba(255,0,0,1)] animate-pulse text-center">
              {status === 'extracting' ? 'EXTRACTING FRAMES...' : 'ANALYZING VIBE...'}
            </h2>
            
            <div className="font-black text-xl bg-black text-white inline-block px-6 py-3 border-4 border-[#FF0000] transform -rotate-2 shadow-[4px_4px_0_rgba(0,0,0,1)]">
              {status === 'extracting' ? 'PROCESSING VIDEO' : 'EXTRACTING VISUALS'}
            </div>
          </div>
        )}

      </div>

      {/* Footer Links for SEO */}
      <footer className="mt-12 mb-4 flex flex-wrap gap-4 sm:gap-8 justify-center font-bold text-sm sm:text-base border-t-4 border-black pt-4 w-full max-w-2xl px-4">
        <Link href="/about" className="hover:text-[#FF0000] hover:underline decoration-4 underline-offset-4 transition-all">ABOUT</Link>
        <Link href="/contact" className="hover:text-[#FF0000] hover:underline decoration-4 underline-offset-4 transition-all">CONTACT</Link>
        <Link href="/privacy" className="hover:text-[#FF0000] hover:underline decoration-4 underline-offset-4 transition-all">PRIVACY</Link>
      </footer>
    </main>
  );
}
