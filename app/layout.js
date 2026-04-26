import './globals.css'
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'Retro Paradox | AI Analyzer',
  description: 'Analyze YouTube videos with Retro Paradox',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Space+Grotesk:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-space min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
