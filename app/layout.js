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
        <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Space+Grotesk:wght@400;700;900&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'retro-yellow': '#FFFF00',
                  'retro-blue': '#002366',
                  'retro-red': '#FF0000',
                },
                fontFamily: {
                  bangers: ['Bangers', 'cursive'],
                  space: ['"Space Grotesk"', 'sans-serif'],
                },
                boxShadow: {
                  'comic': '8px 8px 0px 0px rgba(0,0,0,1)',
                  'comic-hover': '12px 12px 0px 0px rgba(0,0,0,1)',
                  'comic-active': '0px 0px 0px 0px rgba(0,0,0,1)',
                }
              }
            }
          }
        `}}></script>
      </head>
      <body className="font-space min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
