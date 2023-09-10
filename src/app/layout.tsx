import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import Header from '@/components/Header';
import SWRConfigContext from '@/context/SWRConfigContext';
import ThemeProvider from '@/context/ThemeContext';
import '../scss/main.scss';

const inter = Inter({ subsets: ['latin'] })

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
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value as Theme;

  return (
    <html lang="en">
      <body data-theme={theme} className={`${inter.className}`}>
        <ThemeProvider initValue={theme}>
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
