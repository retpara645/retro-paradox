'use client';

import { useState, useEffect } from 'react';
import AdPlaceholder from './components/AdPlaceholder';

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, results, locked
  const [results, setResults] = useState(null);
  const [usages, setUsages] = useState(0);

  useEffect(() => {
    const savedUsages = localStorage.getItem('retpara_usages');
    if (savedUsages) {
      setUsages(parseInt(savedUsages));
      if (parseInt(savedUsages) >= 3) {
        setStatus('locked');
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!url) {
      alert('Please enter a YouTube URL.');
      return;
    }

    if (usages >= 3) {
      setStatus('locked');
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
      setResults(data);
      if (newUsages >= 3) {
        setStatus('locked_after_result');
      } else {
        setStatus('results');
      }
    }
  };

  const handleUnlock = () => {
    setUsages(0);
    localStorage.setItem('retpara_usages', '0');
    setStatus('idle');
    setResults(null);
    window.open('https://example.com/adsterra', '_blank');
  };

  return (
    <main className="min-h-screen bg-[#FFFF00] p-4 md:p-8 flex flex-col items-center relative overflow-x-hidden font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      
      <div className="z-10 w-full max-w-3xl bg-white border-4 border-black shadow-comic p-6 md:p-10 flex flex-col gap-8 my-8 relative rounded-none">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left relative">
          <div className="relative">
            <img 
              src="/retro_paradox_avatar.jpg" 
              alt="Retro Paradox Avatar" 
              onError={(e) => e.target.src="https://placehold.co/150x150/002366/FFFFFF.png?text=Retro"}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black shadow-comic transform -rotate-6 bg-retro-blue object-cover"
            />
            <div className="absolute -z-10 top-[-10px] left-[-10px] w-full h-full bg-retro-red rounded-full border-4 border-black transform rotate-12 scale-110"></div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-6xl md:text-7xl font-bangers tracking-wider text-retro-red drop-shadow-[4px_4px_0_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black] transform -rotate-2">
              Retro Paradox
            </h1>
            <div className="relative mt-2">
              <span className="text-xl md:text-2xl font-bangers uppercase bg-retro-blue text-white px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform rotate-1">
                AI VIDEO ANALYZER
              </span>
            </div>
            {usages < 3 && (
              <span className="mt-4 font-bold text-sm bg-black text-retro-yellow px-4 py-1 border-2 border-black rounded-full uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(255,0,0,1)]">
                {3 - usages} FREE PROMPTS LEFT
              </span>
            )}
          </div>
        </div>

        {/* Input Form */}
        {(status === 'idle' || status === 'results') && (
          <div className="space-y-6 mt-4">
            <div className="flex flex-col gap-2 relative">
              <div className="relative ml-4">
                <label className="text-xl font-bangers tracking-wide bg-white inline-block px-4 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative z-10">
                  ENTER YOUTUBE URL
                </label>
                <div className="absolute w-4 h-4 bg-white border-b-4 border-r-4 border-black bottom-[-8px] left-[20px] transform rotate-45 z-20"></div>
              </div>
              
              <input 
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                className="p-5 mt-2 bg-white border-4 border-black shadow-comic font-bold text-xl outline-none focus:bg-retro-yellow transition-colors placeholder-gray-400 rounded-none w-full"
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={!url}
              className="w-full mt-6 bg-retro-red text-white font-bangers tracking-wider text-4xl py-6 border-4 border-black shadow-comic hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-comic-hover active:translate-x-[4px] active:translate-y-[4px] active:shadow-comic-active transition-all disabled:opacity-50 disabled:pointer-events-none rounded-none"
            >
              ANALYZE NOW!
            </button>
          </div>
        )}

        {/* Loading / Ad Screen */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-10 gap-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bangers text-black drop-shadow-[2px_2px_0_rgba(0,35,102,1)] animate-pulse">ANALYZING VIDEO...</h2>
              <div className="font-bold text-lg bg-black text-white inline-block px-4 py-2 border-4 border-retro-red transform -rotate-1">
                EXTRACTING TIMECODES
              </div>
            </div>
            
            <AdPlaceholder />
          </div>
        )}

        {/* Results Screen */}
        {(status === 'results' || status === 'locked_after_result') && results && (
          <div className="mt-8 space-y-8 animate-fade-in">
            <div className="bg-white border-4 border-black shadow-comic p-8 relative rounded-none">
              <div className="absolute -top-6 -left-2 bg-retro-blue text-white border-4 border-black px-6 py-2 font-bangers text-2xl transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ANALYSIS RESULTS
              </div>
              
              <div className="mt-4 font-bold text-lg whitespace-pre-wrap leading-relaxed prose prose-xl text-black">
                {results.analysis}
              </div>
            </div>

            <button 
              onClick={() => {
                if (status === 'locked_after_result') setStatus('locked');
                else { setStatus('idle'); setResults(null); }
              }}
              className="w-full bg-retro-yellow text-black font-bangers tracking-widest text-3xl py-5 border-4 border-black shadow-comic hover:bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-comic-hover transition-all rounded-none"
            >
              « ANALYZE ANOTHER VIDEO »
            </button>
          </div>
        )}

        {/* Lock Modal */}
        {(status === 'locked' || status === 'locked_after_result') && !results && (
          <div className="absolute inset-0 bg-retro-red/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center border-4 border-black">
            <div className="bg-retro-blue border-4 border-black shadow-comic p-8 max-w-md w-full relative transform rotate-1">
              
              <div className="absolute -top-10 -right-4">
                <img 
                  src="https://placehold.co/100x100/FFFF00/000000.png?text=$$$" 
                  alt="Cash" 
                  className="w-20 h-20 rounded-full border-4 border-black shadow-comic transform rotate-12"
                />
              </div>

              <h2 className="text-5xl font-bangers mb-4 text-white drop-shadow-[3px_3px_0_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black]">LOCKED OUT!</h2>
              <div className="bg-white text-black border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 mb-8">
                <p className="font-bold text-lg">You've used all 3 free prompts today. Support the project to unlock 5 more!</p>
              </div>
              
              <button 
                onClick={handleUnlock}
                className="w-full bg-retro-yellow text-black font-bangers text-3xl py-6 border-4 border-black shadow-comic hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-comic-hover transition-all"
              >
                UNLOCK 5 MORE
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
