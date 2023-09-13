import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import SWRConfigContext from '@/context/SWRConfigContext';
import ThemeProvider from '@/context/ThemeProvider';
import '../scss/main.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `이현지's 블로그`,
  description: '반갑습니다! 이현지 블로그 입니다😊',
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
            <SWRConfigContext>
                {children}
            </SWRConfigContext>
          </main>
        </ThemeProvider>
        <footer>
          All rights reserved &copy; Hyunji, Lee {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  )
}
