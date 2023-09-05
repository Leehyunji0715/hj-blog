import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import SWRConfigContext from '@/context/SWRConfigContext';
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
      <head>
        <script dangerouslySetInnerHTML={{
              __html: `
                const theme = window.localStorage.getItem("theme") ?? "dark";
                document.documentElement.setAttribute("data-theme", theme);
                console.log(theme);
              `,
            }}></script>
      </head>
      <body data-theme='light' className={`${inter.className}`}>
        <Header/>
        <main>
          <SWRConfigContext>
            {children}
          </SWRConfigContext>
        </main>
        <footer>
          All rights reserved &copy; Hyunji, Lee {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  )
}
