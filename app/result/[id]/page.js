"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CopyPromptButton from './CopyPromptButton';
import AdPlaceholder from '@/app/components/AdPlaceholder';
import ShareButtons from '@/app/components/ShareButtons';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const params = useParams();
  const id = params?.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    // 1. Try to load from LocalStorage first (instant load)
    const saved = localStorage.getItem(`retro_result_${id}`);
    if (saved) {
      setData(JSON.parse(saved));
      setLoading(false);
      return;
    }

    // 2. If not found (e.g. shared link), fetch on the fly!
    const fetchAnalysis = async () => {
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: `https://youtu.be/${id}` })
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to analyze video.');
        
        localStorage.setItem(`retro_result_${id}`, JSON.stringify(json.result));
        setData(json.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '5rem 1rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 className="comic-header" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-black)', textShadow: '4px 4px 0 var(--color-yellow)' }}>
          ANALYZING...
        </h2>
        <p style={{ fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>
          Please wait up to 60 seconds.<br/>Our AI is dissecting the video magic! ⚡
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '5rem 1rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="comic-header" style={{ fontSize: '3rem', color: 'var(--color-red)', marginBottom: '1rem' }}>ERROR!</h2>
        <p style={{ fontWeight: 900, fontSize: '1.2rem', marginBottom: '2rem', textTransform: 'uppercase' }}>{error || "Result not found."}</p>
        <Link href="/" className="comic-button">← TRY ANOTHER VIDEO</Link>
      </div>
    );
  }

  const { title, analysis } = data;

  return (
    <div style={{ padding: '3rem 1rem', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      
      {/* Interactive Urban Kawaii Background Decorations */}
      <span className="deco-sparkle" style={{ top: '10%', left: '5%' }}>✨</span>
      <span className="deco-bolt" style={{ top: '20%', right: '8%' }}>⚡</span>
      <span className="deco-sparkle" style={{ bottom: '15%', right: '10%', color: 'var(--color-red)', fontSize: '2.5rem' }}>✨</span>
      <span className="deco-bolt" style={{ bottom: '25%', left: '5%', color: 'var(--color-yellow)', transform: 'rotate(-25deg)', fontSize: '3rem' }}>⚡</span>

      <Link href="/" className="comic-link" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        ← BACK TO WORKSHOP
      </Link>

      <h2 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2.5rem', textTransform: 'uppercase', margin: '0 0 1.5rem 0', lineHeight: 1.1, color: 'var(--color-black)', textShadow: '2px 2px 0 var(--color-white), 4px 4px 0 var(--color-black)' }}>
        {title}
      </h2>

      {/* 1. The Video Panel */}
      <div className="kawaii-video">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* 2. The Prompt Bubble */}
      <div className="speech-box">
        <h3 style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', margin: '0 0 1.5rem 0', color: 'var(--color-yellow)', textShadow: '2px 2px 0 var(--color-black)' }}>
          AI VISUAL ANALYSIS
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {analysis.scenes ? (
            analysis.scenes.map((scene, idx) => (
              <div key={idx} style={{ 
                fontFamily: 'monospace', 
                fontWeight: 700, 
                fontSize: '1.1rem', 
                lineHeight: 1.6,
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(255,255,255,0.2)'
              }}>
                <div><span style={{ color: 'var(--color-yellow)' }}>Time Code:</span> {scene.time_code}</div>
                <div><span style={{ color: 'var(--color-yellow)' }}>Camera Move:</span> {scene.camera_move}</div>
                <div><span style={{ color: 'var(--color-yellow)' }}>Scene:</span> {scene.scene}</div>
                <div><span style={{ color: 'var(--color-yellow)' }}>Characters:</span> {scene.characters}</div>
                <div><span style={{ color: 'var(--color-yellow)' }}>Actions:</span> {scene.actions}</div>
              </div>
            ))
          ) : (
            <p style={{ 
              fontFamily: 'monospace', 
              fontWeight: 700, 
              fontSize: '1.3rem', 
              lineHeight: 1.6,
              margin: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)'
            }}>
              {analysis.prompt}
            </p>
          )}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <strong style={{ fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--color-yellow)' }}>ASPECT RATIO:</strong> 
          <span className="comic-tag" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}>
            {analysis.aspect_ratio}
          </span>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <strong style={{ fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', display: 'block', marginBottom: '1rem', color: 'var(--color-yellow)' }}>
            AESTHETIC TAGS:
          </strong>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {analysis.aesthetic_tags?.map(tag => (
              <span key={tag} className="comic-tag" style={{ backgroundColor: 'var(--color-red)', color: 'var(--color-white)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <CopyPromptButton 
          text={
            analysis.scenes 
            ? analysis.scenes.map(s => `Time Code: ${s.time_code}\nCamera Move: ${s.camera_move}\nScene: ${s.scene}\nCharacters: ${s.characters}\nActions: ${s.actions}`).join('\n\n---\n\n')
            : analysis.prompt
          } 
        />
        
        <ShareButtons title={title} />
      </div>

      <div style={{ marginTop: '4rem' }}>
        <AdPlaceholder />
      </div>
    </div>
  );
}
