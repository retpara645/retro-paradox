'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdPlaceholder from '../../components/AdPlaceholder';

export default function ResultPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch result from API which uses local caching
      fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `https://youtube.com/watch?v=${id}` })
      })
      .then(res => res.json())
      .then(resData => {
        if (resData.error) {
          setError(resData.error);
        } else {
          setData(resData.result);
        }
      })
      .catch(err => {
        setError('Failed to load result. Please try generating again.');
      });
    }
  }, [id]);

  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data.analysis, null, 2));
      alert('Prompt copied to clipboard!');
    }
  };

  const shareText = "Check out this AI-generated prompt for a YouTube video using Retro Paradox! %0A%0A" + window.location.href;

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFFF00] p-4 flex flex-col items-center justify-center font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] text-center">
          <h2 className="text-4xl font-bangers text-[#FF0000] mb-4">ERROR</h2>
          <p className="font-bold text-xl">{error}</p>
          <a href="/" className="mt-6 inline-block bg-[#002366] text-white px-6 py-3 border-4 border-black font-bangers text-2xl shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#003399]">BACK HOME</a>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#FFFF00] p-4 flex flex-col items-center justify-center font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
        <h2 className="text-5xl font-bangers text-black drop-shadow-[2px_2px_0_rgba(255,0,0,1)] animate-pulse">LOADING RESULT...</h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFF00] p-4 md:p-8 flex flex-col items-center font-space text-black relative" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      
      <a href="/" className="mb-6 mr-auto md:ml-10">
        <h1 className="text-4xl md:text-5xl font-bangers tracking-widest text-white drop-shadow-[3px_3px_0_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black] hover:scale-105 transition-transform cursor-pointer inline-block">
          RETRO PARADOX
        </h1>
      </a>

      <div className="w-full max-w-4xl bg-[#002366] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 flex flex-col gap-6 rounded-xl">
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img 
            src={data.thumbnailUrl} 
            alt="Thumbnail" 
            className="w-full md:w-1/3 aspect-video object-cover border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] bg-white"
          />
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold mb-2 line-clamp-2">{data.title}</h2>
            <div className="bg-white text-black p-4 border-4 border-black shadow-[4px_4px_0_rgba(255,255,0,1)] max-h-60 overflow-y-auto font-mono text-sm whitespace-pre-wrap mt-4">
              {JSON.stringify(data.analysis, null, 2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button 
            onClick={handleCopy}
            className="w-full bg-[#FFFF00] text-black font-bangers tracking-wider text-3xl py-4 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all md:col-span-2"
          >
            COPY PROMPT!
          </button>
          
          <a 
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank" rel="noreferrer"
            className="w-full bg-black text-white font-bangers tracking-wider text-2xl py-4 border-4 border-black flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <span className="text-red-500">🐦</span> SHARE ON X
          </a>
          
          <a 
            href={`https://api.whatsapp.com/send?text=${shareText}`}
            target="_blank" rel="noreferrer"
            className="w-full bg-[#25D366] text-white font-bangers tracking-wider text-2xl py-4 border-4 border-black flex justify-center items-center gap-2 hover:bg-green-500 transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)]"
          >
            <span>💬</span> WHATSAPP
          </a>
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <AdPlaceholder />
      </div>

      <footer className="mt-12 mb-4 text-center font-bangers text-xl tracking-wider w-full py-4 border-t-4 border-black bg-[#FFFF00]">
        © 2026 RETRO PARADOX | AI PROMPT LAB
      </footer>

    </main>
  );
}
