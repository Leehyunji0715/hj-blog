'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { GitHubIcon, MoonIcon } from "./icons";

const menu = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Me', href: '/contact' }
];

// const sideMenu = [
//     { element:  }
// ];

export default function Header() {
    const pathname = usePathname();

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
                    <Link href='/'>
                        <li className='header__nav-list-item'>
                            <GitHubIcon/>
                        </li>
                    </Link>
                    <li className='header__nav-list-item'>
                        <MoonIcon/>
                    </li>
                    <li className='header__nav-list-item'>
                        ENG
                    </li>
                </ul>
            </nav>
        </header>
    )
}