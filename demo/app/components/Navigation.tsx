'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Getting Started', href: '/' },
    { name: 'API Reference', href: '/api-reference' },
    { name: 'Playground', href: '/playground' },
    { name: 'Examples', href: '/examples' },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="main-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link href="/">
                        ⌨️ Virtual Keyboard
                    </Link>
                </div>
                <div className="nav-links">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                <a
                    href="https://github.com/yourusername/virtual-keyboard-lib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    GitHub
                </a>
            </div>
        </nav>
    );
}
