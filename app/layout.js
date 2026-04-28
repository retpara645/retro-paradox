import './globals.css'
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL('https://www.retpara.com'),
  title: 'Retro Paradox | AI Video Analyzer & Prompt Generator',
  description: 'Upload a local video or paste a YouTube URL to instantly generate highly detailed, 8-second segmented AI prompts. Built with a stunning Neo-Brutalist Soft Pop Art aesthetic.',
  keywords: ['AI video analyzer', 'AI prompt generator', 'video to prompt', 'YouTube analyzer', 'Gemini AI video', 'Midjourney prompt', 'Sora video prompt', 'retro paradox', 'AI video generation'],
  authors: [{ name: 'Retro Paradox Team' }],
  openGraph: {
    title: 'Retro Paradox | AI Video Analyzer',
    description: 'Instantly generate detailed AI video prompts from any YouTube link or local video.',
    url: 'https://www.retpara.com',
    siteName: 'Retro Paradox',
    images: [
      {
        url: '/retro_paradox_avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'Retro Paradox Thumbnail'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retro Paradox | AI Video Analyzer',
    description: 'Instantly generate detailed AI video prompts from any YouTube link or local video.',
    images: ['/retro_paradox_avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Space+Grotesk:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-space min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
