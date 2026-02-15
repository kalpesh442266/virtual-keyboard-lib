'use client';

import Link from 'next/link';

const navigation = [
    { name: 'Getting Started', href: '/' },
    { name: 'API Reference', href: '/api-reference' },
    { name: 'Playground', href: '/playground' },
    { name: 'Examples', href: '/examples' },
];

export function Navigation() {
    return (
        <nav className="main-nav">
            <div className="nav-container">
                <div className="nav-brand">
                    <Link href="/">
                        ⌨️ Virtual Keyboard
                    </Link>
                </div>
                <div className="nav-links">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="nav-link"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <a
                    href="https://github.com/kalpesh442266/virtual-keyboard-lib"
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
