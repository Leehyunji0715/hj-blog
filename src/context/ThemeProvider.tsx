'use client';

import { ThemeProvider as LibThemeProvider } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <LibThemeProvider>
        {children}
    </LibThemeProvider>
}