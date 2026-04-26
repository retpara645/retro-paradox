'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading
  const [usages, setUsages] = useState(0);

  useEffect(() => {
    const savedUsages = localStorage.getItem('retpara_usages');
    if (savedUsages) {
      setUsages(parseInt(savedUsages));
    }
  }, []);

  const handleAnalyze = async () => {
    if (!url) {
      alert('Please enter a YouTube URL.');
      return;
    }

    if (usages >= 3) {
      alert('Limit Reached: You have used all 3 free prompts.');
      return;
    }

    setStatus('loading');

    const newUsages = usages + 1;
    setUsages(newUsages);
    localStorage.setItem('retpara_usages', newUsages.toString());

    // 8-Second Ad Timer
    const loadingPromise = new Promise(resolve => setTimeout(resolve, 8000));
    
    const fetchPromise = fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    }).then(res => res.json());

    const [_, data] = await Promise.all([loadingPromise, fetchPromise]);

    if (data.error) {
      alert("Error: " + data.error);
      setStatus('idle');
    } else {
      // Data is cached by the backend, just redirect
      window.location.href = `/result/${data.videoId}`;
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFF00] p-4 flex flex-col items-center justify-center font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      
      <h1 className="text-6xl md:text-8xl font-bangers tracking-widest text-white mb-6 transform -rotate-1 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black]">
        RETRO PARADOX
      </h1>

      <div className="w-full max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 flex flex-col gap-6 relative">
        
        {status === 'idle' ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bangers tracking-wide text-black text-center mb-4">
              DROP A YOUTUBE URL AND WATCH THE AI GENERATE A PROMPT BASED ON ITS VIBE!
            </h2>

            <input 
              type="text"
              placeholder="HTTPS://YOUTU.BE/..."
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-xl outline-none focus:bg-gray-100 transition-colors placeholder-gray-300 w-full"
            />

            <button 
              onClick={handleAnalyze}
              disabled={!url}
              className="w-full bg-[#FF0000] text-white font-bangers tracking-wider text-4xl py-5 mt-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              GENERATE PROMPT!
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-6">
            <h2 className="text-5xl font-bangers text-black drop-shadow-[2px_2px_0_rgba(255,0,0,1)] animate-pulse">ANALYZING VIBE...</h2>
            <div className="font-bold text-xl bg-black text-white inline-block px-6 py-3 border-4 border-[#FF0000] transform -rotate-2 shadow-[4px_4px_0_rgba(0,0,0,1)]">
              EXTRACTING VISUALS
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
