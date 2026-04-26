import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Retro Paradox | AI Analyzer",
  description: "Generate Midjourney prompts from YouTube videos using AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <footer style={{
          backgroundColor: 'var(--color-yellow)',
          borderTop: 'var(--border-thick)',
          padding: '2rem 1rem',
          textAlign: 'center',
          marginTop: 'auto'
        }}>
          <p style={{
            fontFamily: 'Montserrat',
            fontWeight: 900,
            fontSize: '1.2rem',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            © 2026 Retro Paradox | AI Prompt Lab
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
