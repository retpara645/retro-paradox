import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.retpara.com';
  
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
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
          priority: 0.7,
        };
      });
      
      return [...routes, ...dynamicRoutes];
    }
  } catch (error) {
    console.error('Sitemap Error:', error);
  }

  return routes;
}
