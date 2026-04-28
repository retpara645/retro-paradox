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
      const cached = localStorage.getItem(`retpara_result_${id}`);
      if (cached) {
        try {
          setData(JSON.parse(cached));
          return;
        } catch(e) {}
      }

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
          localStorage.setItem(`retpara_result_${id}`, JSON.stringify(resData.result));
        }
      })
      .catch(err => {
        setError('Failed to load result. Please try generating again.');
      });
    }
  }, [id]);

  const handleCopy = () => {
    if (data && data.analysis) {
      navigator.clipboard.writeText(JSON.stringify(data.analysis, null, 2));
      alert('Prompt copied to clipboard!');
    }
  };

  const shareText = "Check out this AI-generated prompt for a YouTube video using Retro Paradox! \n\n" + (typeof window !== 'undefined' ? window.location.href : '');
  const encodedShareText = typeof window !== 'undefined' ? encodeURIComponent(shareText) : '';

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFFF00] p-4 flex flex-col items-center justify-center font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] text-center rounded-3xl">
          <h2 className="text-4xl font-black text-[#FF0000] mb-4">ERROR</h2>
          <p className="font-bold text-xl">{error}</p>
          <a href="/" className="mt-6 inline-block bg-[#002366] text-white px-6 py-3 border-4 border-black font-black text-xl shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#003399] rounded-xl">BACK HOME</a>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#FFFF00] p-4 flex flex-col items-center justify-center font-space text-black" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
        <h2 className="text-5xl font-black text-black drop-shadow-[2px_2px_0_rgba(255,0,0,1)] animate-pulse">LOADING RESULT...</h2>
      </main>
    );
  }

  const analysis = data.analysis || {};
  const scenes = analysis.scenes || [];
  const aspectRatio = analysis.aspect_ratio || "Unknown";
  const tags = analysis.aesthetic_tags || [];

  return (
    <main className="min-h-screen bg-[#FFFF00] p-3 sm:p-4 md:p-8 flex flex-col items-center font-space text-black relative overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 2px, transparent 2px)', backgroundSize: '20px 20px' }}>
      
      {/* Back to Homepage Button */}
      <a 
        href="/"
        className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-8 md:left-8 bg-white text-black font-black text-xs sm:text-sm md:text-lg px-3 py-1.5 sm:px-4 sm:py-2 border-2 sm:border-4 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] sm:shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all rounded-xl z-50 flex items-center gap-1 sm:gap-2"
      >
        &larr; <span className="hidden sm:inline">BACK TO HOMEPAGE</span><span className="sm:hidden">HOME</span>
      </a>

      {/* Decorative Stars */}
      <div className="absolute top-20 left-10 text-5xl transform -rotate-12 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">✨</div>
      <div className="absolute top-80 right-10 text-6xl transform rotate-12 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">⚡</div>
      <div className="absolute bottom-40 left-10 text-6xl transform -rotate-12 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">⚡</div>
      <div className="absolute bottom-80 right-20 text-5xl transform rotate-12 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">✨</div>
      
      {/* Content Container */}
      <div className="w-full max-w-4xl bg-[#002366] border-4 border-black p-4 sm:p-6 md:p-10 mt-16 sm:mt-14 md:mt-8 mb-10 flex flex-col gap-4 sm:gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10 rounded-2xl sm:rounded-3xl relative">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFFF00] mb-2 sm:mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          AI VISUAL ANALYSIS
        </h1>

        <div className="absolute top-[-15px] sm:top-[-20px] right-2 sm:right-[-20px] bg-[#FFFF00] border-4 border-black px-3 sm:px-6 py-1 sm:py-2 text-xl sm:text-3xl font-black shadow-[4px_4px_0_rgba(0,0,0,1)] transform rotate-3 z-20 whitespace-nowrap text-black">
          VIBE ANALYZED!
        </div>

        <div className="flex flex-col gap-4">
          {scenes.map((scene, index) => (
            <div key={index} className="border-2 border-[#3b82f6] p-4 bg-[#001a4d] text-white font-mono text-sm md:text-base leading-relaxed rounded-2xl shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
              <p><span className="text-[#FFFF00] font-bold">Time Code:</span> {scene.time_code}</p>
              <p><span className="text-[#FFFF00] font-bold">Camera Move:</span> {scene.camera_move}</p>
              <p><span className="text-[#FFFF00] font-bold">Scene:</span> {scene.scene}</p>
              <p><span className="text-[#FFFF00] font-bold">Characters:</span> {scene.characters}</p>
              <p><span className="text-[#FFFF00] font-bold">Actions:</span> {scene.actions}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4">
          <h2 className="text-[#FFFF00] font-black text-xl md:text-2xl">ASPECT RATIO:</h2>
          <div className="bg-white text-black font-black text-xl px-4 py-2 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] rounded-xl">
            {aspectRatio}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-[#FFFF00] font-black text-xl md:text-2xl mb-4">AESTHETIC TAGS:</h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span key={index} className="bg-[#FF0000] text-white font-black text-sm md:text-base px-4 py-2 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] uppercase rounded-xl">
                #{tag.replace(/^#/, '')}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
          <button 
            onClick={handleCopy}
            className="w-full sm:w-auto bg-[#FFFF00] text-black font-black text-xl sm:text-2xl py-3 px-6 sm:py-4 sm:px-8 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all rounded-xl sm:rounded-2xl flex items-center justify-center"
          >
            COPY PROMPT!
          </button>

          <a 
            href={`https://x.com/intent/tweet?text=${encodedShareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-black text-white font-black text-xl sm:text-2xl py-3 px-6 sm:py-4 sm:px-8 border-4 border-[#3b82f6] shadow-[4px_4px_0_rgba(59,130,246,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(59,130,246,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(59,130,246,1)] transition-all rounded-xl sm:rounded-2xl flex items-center justify-center"
          >
            SHARE TO 𝕏
          </a>
        </div>

      </div>

    </main>
  );
}
