import fs from 'fs';
import path from 'path';

const CACHE_FILE = path.join(process.cwd(), '.analysis_cache.json');
const TTL_24_HOURS = 24 * 60 * 60 * 1000;

export function getCache(id) {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      const cachedItem = data[id];
      
      if (cachedItem) {
        // Check if older than 24 hours
        if (Date.now() - cachedItem.timestamp < TTL_24_HOURS) {
          return cachedItem.result;
        } else {
          // Expired
          delete data[id];
          fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
        }
      }
    }
  } catch (error) {
    console.error('Cache read error:', error);
  }
  return null;
}

export function setCache(id, result) {
  try {
    let data = {};
    if (fs.existsSync(CACHE_FILE)) {
      data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    }
    data[id] = {
      result,
      timestamp: Date.now()
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}
