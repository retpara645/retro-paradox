import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }) {
  const { id } = params;
  
  try {
    const cacheFile = path.join(process.cwd(), '.analysis_cache.json');
    if (fs.existsSync(cacheFile)) {
      const data = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
      const item = data[id];
      
      if (item && item.result && item.result.title) {
        return {
          title: `Prompt for: ${item.result.title} | Retro Paradox`,
          description: `Get the detailed AI video generation prompt and aesthetic analysis for "${item.result.title}".`,
          openGraph: {
            title: `AI Prompt for: ${item.result.title}`,
            description: `Get the detailed AI video generation prompt and aesthetic analysis for "${item.result.title}".`,
            images: [
              {
                url: item.result.thumbnailUrl || '/retro_paradox_avatar.jpg',
                width: 1200,
                height: 630,
              },
            ],
          },
          twitter: {
            card: 'summary_large_image',
            title: `AI Prompt for: ${item.result.title}`,
            description: `Get the detailed AI video generation prompt and aesthetic analysis for "${item.result.title}".`,
            images: [item.result.thumbnailUrl || '/retro_paradox_avatar.jpg'],
          },
        };
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'AI Video Analysis Result | Retro Paradox',
    description: 'Detailed AI video prompt analysis.',
  };
}

export default function ResultLayout({ children }) {
  return <>{children}</>;
}
