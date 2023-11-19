import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/context/ThemeProvider';
import siteMetadata from '@/data/siteMetadata';
import '../scss/main.scss';

const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export type Theme = 'light' | 'dark';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteMetadata.language}>
      <body className={`${inter.className}`}>
          <ThemeProvider>
            <Header/>
            <main>
              {children}
            </main>
            <Footer/>
          </ThemeProvider>
      </body>
    </html>
  )
}
