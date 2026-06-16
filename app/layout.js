import './globals.css'
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata = {
  metadataBase: new URL('https://www.retpara.com'),
  alternates: {
    canonical: '/',
  },
  title: 'Retro Paradox | Support Center',
  description: 'Selamat Datang di Pusat Bantuan Retro Paradox. Jika Anda mengalami kendala terkait produk digital, tim kami siap membantu.',
  keywords: ['retro paradox', 'support', 'bantuan', 'digital products', 'marketplaceai'],
  authors: [{ name: 'Retro Paradox Team' }],
  openGraph: {
    title: 'Retro Paradox | Support Center',
    description: 'Pusat Bantuan Resmi Retro Paradox. Kami siap memandu Anda mengatur produk digital Anda.',
    url: 'https://www.retpara.com',
    siteName: 'Retro Paradox Support',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Retro Paradox Logo'
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retro Paradox | Support Center',
    description: 'Pusat Bantuan Resmi Retro Paradox.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-M9D1GHCGQ2"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M9D1GHCGQ2', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-white text-gray-900 antialiased selection:bg-pink-100 selection:text-pink-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
