import Link from 'next/link';
import { getCache } from '@/lib/cache';
import { redirect } from 'next/navigation';
import CopyPromptButton from './CopyPromptButton';
import AdPlaceholder from '@/app/components/AdPlaceholder';
import ShareButtons from '@/app/components/ShareButtons';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const data = getCache(resolvedParams.id);
  
  if (!data) return { title: 'Not Found | Retro Paradox' };
  
  return {
    title: `AI Prompt for ${data.title} - Retro Paradox`,
    description: `Discover the AI generated prompt simulating the cinematic vibe of ${data.title}.`,
  };
}

export default async function ResultPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Retrieve analysis from server-side cache
  const data = getCache(id);

  if (!data) {
    redirect('/');
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
