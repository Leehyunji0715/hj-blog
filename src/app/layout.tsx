import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SWRConfigContext from '@/context/SWRConfigContext';
import ThemeProvider from '@/context/ThemeProvider';
import AuthSessionProvider from '@/context/SessionProvider';
import '../scss/main.scss';
import { PostListProvider } from '@/context/PostListProvider';
import { getAllPosts } from '@/service/posts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `이현지's 블로그`,
  description: '반갑습니다! 이현지 블로그 입니다😊',
}

export type Theme = 'light' | 'dark';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("layout");
  const posts = await getAllPosts();
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthSessionProvider>
          <ThemeProvider>
            <PostListProvider initValue={posts}>
            <Header/>
            <main>
              <SWRConfigContext>
                  {children}
              </SWRConfigContext>
            </main>
            <Footer/>
            </PostListProvider>
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
