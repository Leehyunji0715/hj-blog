'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { GitHubIcon, PlusIcon } from "./icons";
import ThemeSwitch from "./ThemeSwitch";

const menu = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: <GitHubIcon/>, href: 'https://github.com/Leehyunji0715', props: { target: "_blank" } },
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

    return (
        <header className="header">
            <Link href='/'>
                <Image width={100} height={50} src='/logo.png' alt="logo image"/>
            </Link>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    {/* {
                        data?.user.role === $Enums.Role.ADMIN && (
                        <Link key='/post/add' href='/post/add'>
                            <li className={`${isSelectedMenu(pathname, '/post/add') && "header__nav-list-item--selected"}`}>
                                <PlusIcon/>
                            </li>
                        </Link>
                        )
                    } */}
                    { menu.map(({href, label, props}, i) => (
                        <Link key={i} href={`${href}${getQueryString(href)}`} {...props}>
                            <li className={`${isSelectedMenu(pathname, href) && "header__nav-list-item--selected"}`}>
                                {label}
                            </li>
                        </Link>
                    )) }
                </ul>
                <ThemeSwitch/>
            </nav>
        </header>
    )
}