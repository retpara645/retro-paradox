'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdPlaceholder from './components/AdPlaceholder';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const router = useRouter();

  const checkLimit = () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('theguh_usage_date');
    let count = parseInt(localStorage.getItem('theguh_usage_count') || '0', 10);

    if (storedDate !== today) {
      count = 0;
      localStorage.setItem('theguh_usage_date', today);
      localStorage.setItem('theguh_usage_count', '0');
    }

    if (count >= 3) {
      return false;
    }
    return true;
  };

  const incrementLimit = () => {
    let count = parseInt(localStorage.getItem('theguh_usage_count') || '0', 10);
    localStorage.setItem('theguh_usage_count', (count + 1).toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkLimit()) {
      setShowLimitModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setShowLimitModal(true);
          return;
        }
        throw new Error(data.error || 'Analysis failed');
      }

      if (!data.cached) {
        incrementLimit(); // Only increment if it actually used the API
      }

      localStorage.setItem(`retro_result_${data.videoId}`, JSON.stringify(data.result));
      router.push(`/result/${data.videoId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <AdPlaceholder />
      
      <h1 className="comic-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Retro Paradox
      </h1>
      
      <div className="comic-card comic-card-blue">
        <p style={{ fontWeight: 900, fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', marginBottom: '2rem', textTransform: 'uppercase', lineHeight: 1.4 }}>
          DROP A YOUTUBE URL AND WATCH THE AI GENERATE A PROMPT BASED ON ITS VIBE!
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <input 
            type="url" 
            placeholder="HTTPS://YOUTU.BE/..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="comic-input"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="comic-button"
          >
            {loading ? 'ANALYZING...' : 'GENERATE PROMPT!'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '2rem', backgroundColor: 'var(--color-yellow)', border: 'var(--border-thick)', padding: '1.5rem', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--color-red)' }}>
            🚨 ERROR: {error}
          </div>
        )}
      </div>

      {showLimitModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="comic-card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative', boxShadow: '12px 12px 0px 0px var(--color-red)' }}>
            <button 
              onClick={() => setShowLimitModal(false)}
              style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--color-white)', color: 'var(--color-black)', border: 'var(--border-thick)', borderRadius: '50%', width: '50px', height: '50px', fontWeight: 900, cursor: 'pointer', fontSize: '1.5rem', boxShadow: '4px 4px 0px 0px var(--color-black)' }}
            >
              X
            </button>
            <h2 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2.5rem', color: 'var(--color-red)', margin: '0 0 1rem 0' }}>
              LIMIT REACHED!
            </h2>
            <p style={{ fontWeight: 900, fontSize: '1.2rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
              Come back tomorrow or watch a quick ad to unlock more prompts!
            </p>
            <div style={{ border: 'var(--border-thick)', background: 'var(--color-yellow)', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', fontWeight: 900, color: 'var(--color-black)', boxShadow: 'inset 4px 4px 0px 0px rgba(0,0,0,0.1)' }}>
              [ REWARD VIDEO AD PLACEHOLDER ]
            </div>
            <button className="comic-button" style={{ width: '100%' }} onClick={() => alert('Ad reward logic to be implemented by Ad Network SDK!')}>
              WATCH AD TO UNLOCK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
