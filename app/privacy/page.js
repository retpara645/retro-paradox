import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Retro Paradox',
  description: 'Privacy Policy for Retro Paradox',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
      
      <Link href="/" className="comic-link" style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
        &larr; BACK TO HOME
      </Link>

      <h1 className="comic-header" style={{ textAlign: 'center', wordBreak: 'break-word' }}>PRIVACY POLICY</h1>
      
      <div className="comic-card comic-card-blue" style={{ width: '100%', marginTop: '1rem' }}>
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', borderBottom: '4px solid var(--color-black)', display: 'inline-block', paddingBottom: '0.2rem' }}>
          OUR POLICY
        </h2>
        
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', fontWeight: 600 }}>
          <p style={{ marginBottom: '1rem', fontWeight: 900, fontSize: '1.3rem' }}>Effective Date: April 2026</p>
          <p style={{ marginBottom: '2rem' }}>At Retro Paradox (accessible from our website), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Retro Paradox and how we use it.</p>
          
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>1. Information We Collect</h3>
          <p style={{ marginBottom: '1.5rem' }}>We do not require users to create an account or provide personal information to use our AI Prompt Lab. The only input we process is the public YouTube URLs provided by the user to generate text prompts. We do not store or claim ownership of the original video content.</p>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>2. Log Files</h3>
          <p style={{ marginBottom: '1.5rem' }}>Retro Paradox follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>3. Google AdSense &amp; DoubleClick DART Cookie</h3>
          <p style={{ marginBottom: '1.5rem' }}>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL &ndash; <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="comic-link" style={{ fontSize: '1.1rem', textTransform: 'none' }}>https://policies.google.com/technologies/ads</a></p>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>4. Third-Party APIs</h3>
          <p style={{ marginBottom: '1.5rem' }}>Our prompt generation tool utilizes the YouTube Data API to fetch public video metadata and the Google Gemini API to analyze visual elements. By using our tool, you are also bound by the Google Privacy Policy.</p>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--color-blue)' }}>5. Consent</h3>
          <p style={{ marginBottom: '1.5rem' }}>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions. If you have additional questions or require more information, please contact us via our official YouTube channel, Retro Paradox.</p>
        </div>
      </div>
    </main>
  );
}
