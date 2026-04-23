import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const baseUrl = 'https://theguh-workshop.com'; // Replace with real domain later
  
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  try {
    const cacheFile = path.join(process.cwd(), '.analysis_cache.json');
    if (fs.existsSync(cacheFile)) {
      const data = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
      
      const dynamicRoutes = Object.keys(data).map((id) => {
        const item = data[id];
        return {
          url: `${baseUrl}/result/${id}`,
          lastModified: new Date(item.timestamp || Date.now()),
          changeFrequency: 'never',
          priority: 0.8,
        };
      });
      
      return [...routes, ...dynamicRoutes];
    }
  } catch (error) {
    console.error('Sitemap Error:', error);
  }

  return routes;
}
