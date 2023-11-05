import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/context/ThemeProvider';
import '../scss/main.scss';

const inter = Inter({ subsets: ['latin'], fallback: ['system-ui', 'arial'] });

export const metadata: Metadata = {
  title: {
    default: "이현지's 블로그",
    template: "케이티의 블로그 | %s"
  },
  description: '반갑습니다! 이현지 블로그 입니다😊',
  icons: 'favicon.ico'
}

export type Theme = 'light' | 'dark';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
