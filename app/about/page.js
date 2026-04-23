import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About | Retro Paradox',
  description: 'About Retro Paradox',
};

export default function AboutPage() {
  return (
    <main style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
      
      <Link href="/" className="comic-link" style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
        &larr; BACK TO HOME
      </Link>

      <h1 className="comic-header" style={{ textAlign: 'center', wordBreak: 'break-word' }}>ABOUT US</h1>
      
      <div className="comic-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', marginTop: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start' }}>
          
          <div style={{ flex: '1 1 200px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ border: 'var(--border-thick)', boxShadow: '8px 8px 0px 0px var(--color-black)', borderRadius: '12px', overflow: 'hidden', width: '100%', maxWidth: '250px', aspectRatio: '1/1', position: 'relative', backgroundColor: 'var(--color-yellow)' }}>
              <Image 
                src="/retro_paradox_avatar.jpg" 
                alt="Retro Paradox Avatar" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div style={{ flex: '2 1 300px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', borderBottom: '4px solid var(--color-black)', display: 'inline-block', paddingBottom: '0.2rem' }}>
              WHO WE ARE
            </h2>
            <div style={{ fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 700 }}>
              <p style={{ marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 900 }}>Precision is Everything.</p>
              <p style={{ marginBottom: '1rem' }}>Whether applying a flawless coat of paint to a premium vehicle or generating the perfect AI video, the details matter. Founded by a professional automotive body and paint technician who understands the strict Standard Operating Procedures (SOP) of top-tier European brands, Retro Paradox brings that same high-quality standard and precision into the world of Artificial Intelligence.</p>
              <p style={{ marginBottom: '1rem' }}>We are the creative lab behind Retro Paradox, a YouTube channel dedicated to exploring mind-bending &quot;What If&quot; scenarios wrapped in a bold, high-contrast Urban Pop Art aesthetic.</p>
              <p style={{ marginBottom: '1rem' }}>We built the AI Prompt Lab to solve a problem we faced ourselves as creators. When you see a stunning AI-generated video, the first question is always: &quot;How did they make that?&quot; Our tool utilizes cutting-edge Google Gemini vision technology to reverse-engineer YouTube videos and extract detailed image and video generation prompts.</p>
              <p style={{ marginBottom: '1rem' }}>Our mission is simple: to help creators, prompt engineers, and AI enthusiasts dissect the magic, learn the exact camera angles and stylistic keywords, and build their own digital masterpieces.</p>
              <p style={{ fontWeight: 900, backgroundColor: 'var(--color-yellow)', display: 'inline-block', padding: '0.5rem 1rem', border: 'var(--border-thick)', boxShadow: '4px 4px 0px 0px var(--color-black)' }}>Paste a link. Get the prompt. Start creating.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
