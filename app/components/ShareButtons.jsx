'use client';

import { useEffect, useState } from 'react';

export default function ShareButtons({ title }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // eslint-disable-next-line
    setUrl(window.location.href);
  }, []);

  const shareText = `Check out the AI Prompt for "${title}" generated on Retro Paradox! 🚀`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + url)}`;

  if (!url) return null;

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
      <a 
        href={twitterUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="comic-button"
        style={{ backgroundColor: '#000', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', fontSize: '1.2rem', padding: '1rem' }}
      >
        🐦 SHARE ON X
      </a>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="comic-button"
        style={{ backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center', fontSize: '1.2rem', padding: '1rem' }}
      >
        💬 WHATSAPP
      </a>
    </div>
  );
}
