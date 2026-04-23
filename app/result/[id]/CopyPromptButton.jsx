'use client';

import { useState } from 'react';

export default function CopyPromptButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={handleCopy}
        className="comic-copy-btn"
      >
        COPY PROMPT!
      </button>

      {copied && (
        <div style={{
          position: 'absolute',
          top: '-70px',
          right: '-90px',
          width: '160px',
          height: '160px',
          zIndex: 10,
          animation: 'pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          pointerEvents: 'none'
        }}>
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,1))' }}>
            <path 
              d="M100 5 L125 70 L195 60 L145 115 L175 190 L100 145 L25 190 L55 115 L5 60 L75 70 Z" 
              fill="var(--color-yellow)" 
              stroke="var(--color-black)" 
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <text 
              x="100" 
              y="105" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fill="var(--color-red)" 
              fontWeight="900" 
              fontSize="30" 
              fontFamily="Montserrat" 
              stroke="var(--color-black)" 
              strokeWidth="1.5" 
              paintOrder="stroke"
              style={{ transform: 'rotate(-5deg)', transformOrigin: 'center' }}
            >
              SUCCESS!
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
