import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import '../scss/main.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `이현지's 블로그`,
  description: '반갑습니다! 이현지 블로그 입니다😊',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
