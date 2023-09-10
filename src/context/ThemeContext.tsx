'use client';

import { createContext, useContext, useCallback, useEffect, useState } from 'react';


const ThemeContext = createContext<undefined | Theme>(undefined);
const ThemeActionContext = createContext<undefined | ChangeTheme>(undefined);


export type Theme = 'light' | 'dark';
type ChangeTheme = (theme: Theme) => void;


export default function ThemeProvider({ initValue, children }: { initValue?: Theme, children: React.ReactNode }) {
    const [theme, setTheme] = useState<undefined | Theme>(initValue);
    const [systheme, setSystheme] = useState<Theme>('dark');

    const changeTheme = useCallback((theme: Theme) => {
        setTheme(theme);
    }, []);

    useEffect(() => {
        let sysTheme;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            sysTheme = 'dark';
            setSystheme('dark');
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            sysTheme = 'light';
            setSystheme('light');
        }
        if (theme !== 'light' && theme !== 'dark') {
            setTheme(sysTheme as Theme);
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.cookie = `theme=${theme}`;
            document.body.setAttribute("data-theme", theme);
        }
    }, [theme]);

    return <ThemeActionContext.Provider value={changeTheme}>
        <ThemeContext.Provider value={theme ?? systheme}>
            {children}
        </ThemeContext.Provider>
    </ThemeActionContext.Provider>;
}

export function useThemeState() {
    const value = useContext(ThemeContext);
    if (value === undefined) {
        throw new Error("'useThemeState' should be used within 'ThemeContext'");
    }
    return value;
}

export function useThemeAction() {
    const fn = useContext(ThemeActionContext);
    if (fn === undefined) {
        throw new Error("'useThemeState' should be used within 'ThemeContext'");
    }
    return fn;
}
  