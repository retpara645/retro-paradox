import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Retro Paradox',
  description: 'Contact Retro Paradox',
};

export default function ContactPage() {
  return (
    <main style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .contact-link {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          color: var(--color-black);
          text-decoration: none;
          padding: 0.8rem 1.5rem;
          background-color: var(--color-yellow);
          transition: all 0.2s;
          display: inline-block;
          margin: 0.5rem 0;
          box-shadow: 6px 6px 0px 0px var(--color-black);
          border: 4px solid var(--color-black);
          font-size: 1.2rem;
          text-transform: uppercase;
        }
        .contact-link:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0px 0px var(--color-black);
          background-color: var(--color-white);
        }
      `}} />
      
      <Link href="/" className="comic-link" style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
        &larr; BACK TO HOME
      </Link>

      <h1 className="comic-header" style={{ textAlign: 'center', wordBreak: 'break-word', color: 'var(--color-white)' }}>CONTACT US</h1>
      
      <div className="comic-card" style={{ width: '100%', marginTop: '1rem' }}>
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '4px solid var(--color-black)', display: 'inline-block', paddingBottom: '0.2rem' }}>
          Get in Touch with Retro Paradox
        </h2>
        
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', fontWeight: 600 }}>
          <p style={{ marginBottom: '1rem' }}>Have a question about our AI Prompt Lab, a suggestion for a new feature, or a business inquiry? We'd love to hear from you.</p>
          <p style={{ marginBottom: '2rem' }}>As a platform built for the creator community, your feedback helps us fine-tune our tools to be as precise and helpful as possible.</p>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--color-blue)', fontSize: '1.3rem' }}>How to Reach Us:</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem' }}>Email for General &amp; Business Inquiries:</p>
              <a href="mailto:arditeguh02@gmail.com" className="contact-link" style={{ textTransform: 'lowercase' }}>
                arditeguh02@gmail.com
              </a>
            </div>

            <div>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem' }}>YouTube Community:</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>Drop a comment or connect with us on our official channel, Retro Paradox, where we explore the wild world of AI and &quot;What If&quot; scenarios.</p>
              <a href="https://youtube.com/@retpara?si=gA4zVaw_nZFfiWkc" target="_blank" rel="noopener noreferrer" className="contact-link">
                Retro Paradox
              </a>
            </div>

            <div>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--color-red)' }}>Location:</p>
              <p style={{ margin: 0, fontWeight: 900, padding: '0.5rem 1rem', border: 'var(--border-thick)', display: 'inline-block', backgroundColor: 'var(--color-yellow)', boxShadow: '4px 4px 0px 0px var(--color-black)' }}>Jawa Barat, Indonesia.</p>
            </div>
          </div>

          <p style={{ marginBottom: '0', fontSize: '1.2rem', fontWeight: 900, borderTop: '4px dashed var(--color-black)', paddingTop: '1rem' }}>
            We aim to respond to all business inquiries within 24-48 hours. Keep creating, keep experimenting!
          </p>
        </div>
      </div>
    </main>
  );
}
