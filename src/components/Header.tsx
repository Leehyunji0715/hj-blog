'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useThemeAction, useThemeState } from "@/context/ThemeContext";
import { GitHubIcon, MoonIcon, SunIcon } from "./icons";

const menu = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
];

function getQueryString(href: string) {
    if (href === '/blog') {
        return '/all/?page=1';
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
    const theme = useThemeState();
    const changeTheme = useThemeAction();

    const handleDarkmode = () => {
        changeTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="header">
            <Link href='/'>
                <img src='/logo.png'/>
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
                    <li className='header__nav-list-item'>
                        <button onClick={handleDarkmode} className="thememode-btn">
                            { theme === 'dark' ? <SunIcon/> : <MoonIcon/> }
                        </button>
                    </li>
                    {/* <li className='header__nav-list-item'>
                        ENG
                    </li> */}
                </ul>
            </nav>
        </header>
    )
}