'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes'
import { GitHubIcon, MoonIcon, SunIcon } from "./icons";

const menu = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
];

function getQueryString(href: string) {
    if (href === '/blog') {
        return '/all/1';
    }
    return '';
}

function isSelectedMenu(pathname: string, href: string) {
    if ((href === '/' && pathname === href)
        || (href !== '/' && pathname.startsWith(href))
    ) {
        return true;
    }
    return false;
}


export default function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const handleDarkmode = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="header">
            <Link href='/'>
                <Image width={100} height={50} src='/logo.png' alt="logo image"/>
            </Link>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    { menu.map(({href, label}, i) => (
                        <Link key={i} href={`${href}${getQueryString(href)}`}>
                            <li className={`header__nav-list-item ${isSelectedMenu(pathname, href) ? "header__nav-list-item--selected" : ""}`}>
                                {label}
                            </li>
                        </Link>
                    )) }
                    <Link href={'https://github.com/Leehyunji0715'} target="_blank">
                        <li className='header__nav-list-item'>
                            <GitHubIcon/>
                        </li>
                    </Link>
                    {
                        mounted && (
                        <li className='header__nav-list-item'>
                            <button onClick={handleDarkmode} className="thememode-btn">
                                { theme === 'dark' ? <SunIcon/> : <MoonIcon/> }
                            </button>
                        </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}