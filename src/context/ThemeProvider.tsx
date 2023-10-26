'use client';
import { ThemeProvider as LibThemeProvider } from 'next-themes'
import siteMetadata  from '@/data/siteMetadata'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    
    return <LibThemeProvider defaultTheme={siteMetadata.theme} enableSystem>
        {children}
    </LibThemeProvider>
}