'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { GitHubIcon, MoonIcon, SunIcon } from "./icons";
import { useEffect, useState } from "react";

const menu = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
];

export default function Header() {
    const pathname = usePathname();
    const [theme, setTheme] = useState<string>("dark");

    const handleDarkmode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        setTheme(window?.localStorage.getItem('theme') ?? "dark");
    }, []);

    useEffect(() => {
        if (theme) {
            document.body.setAttribute("data-theme", theme);
            window.localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <header className="header">
            <Link href='/'>
                <img src='/logo.png'/>
            </Link>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    { menu.map(({href, label}, i) => (
                        <Link key={i} href={href}>
                            <li className={`header__nav-list-item ${pathname === href ? "header__nav-list-item--selected" : ""}`}>
                                {label}
                            </li>
                        </Link>
                    )) }
                    <Link href={process.env.GITHUB_URL ?? ''} target="_blank">
                        <li className='header__nav-list-item'>
                            <GitHubIcon/>
                        </li>
                    </Link>
                    <li className='header__nav-list-item'>
                        <button onClick={handleDarkmode} className="thememode-btn">
                            { theme === 'dark' ? <SunIcon/> : <MoonIcon/> }
                        </button>
                    </li>
                    <li className='header__nav-list-item'>
                        ENG
                    </li>
                </ul>
            </nav>
        </header>
    )
}