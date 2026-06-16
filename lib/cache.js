import { createClient } from '@vercel/kv';

const TTL_24_HOURS_SEC = 24 * 60 * 60;
const MAX_REQUESTS = 3;

// Get credentials from either Vercel KV or Upstash integration
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Create client if credentials exist
const kv = url && token ? createClient({ url, token }) : null;

// In-memory fallback for local dev (when KV is not configured)
const localCache = new Map();
const localRateLimit = new Map();

function hasKV() {
  return kv !== null;
}

export async function getCache(id) {
  if (hasKV()) {
    try {
      return await kv.get(`cache:${id}`);
    } catch (e) {
      console.error('KV get error:', e);
      return null;
    }
  } else {
    const item = localCache.get(id);
    if (item && Date.now() - item.timestamp < TTL_24_HOURS_SEC * 1000) {
      return item.result;
    }
    return null;
  }
}

export async function setCache(id, result) {
  if (hasKV()) {
    try {
      await kv.set(`cache:${id}`, result, { ex: TTL_24_HOURS_SEC });
    } catch (e) {
      console.error('KV set error:', e);
    }
  } else {
    localCache.set(id, { result, timestamp: Date.now() });
  }
}

export async function checkRateLimit(ip) {
  // Normalize unknown IP
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
    ip = 'anonymous_local';
  }

  if (hasKV()) {
    try {
      const key = `ratelimit:${ip}`;
      const count = await kv.incr(key);
      if (count === 1) {
        await kv.expire(key, TTL_24_HOURS_SEC);
      }
      return count <= MAX_REQUESTS;
    } catch (e) {
      console.error('KV ratelimit error:', e);
      return true; // Fail open if KV is down
    }
  } else {
    const now = Date.now();
    const record = localRateLimit.get(ip);
    if (!record || now - record.firstRequest > TTL_24_HOURS_SEC * 1000) {
      localRateLimit.set(ip, { count: 1, firstRequest: now });
      return true;
    }
    if (record.count >= MAX_REQUESTS) return false;
    record.count++;
    return true;
  }
}

export async function unlockRateLimit(ip) {
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
    ip = 'anonymous_local';
  }
  if (hasKV()) {
    try {
      const key = `ratelimit:${ip}`;
      // Decrease the usage count by 3, allowing 3 more uses
      await kv.decrby(key, 3);
    } catch (e) {
      console.error('KV unlock error:', e);
    }
  } else {
    const record = localRateLimit.get(ip);
    if (record) {
      record.count = Math.max(0, record.count - 3);
    }
  }
}
