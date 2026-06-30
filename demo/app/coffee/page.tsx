'use client';

import docs from '../styles/docs.module.scss';
import styles from './page.module.scss';
import { LINKS, CONTACT_EMAIL } from '../config';

export default function CoffeePage() {
    return (
        <div className={docs.layout}>
            <div className={styles.hero}>
                <div className={styles.emoji}>☕</div>
                <h1 className={docs.title}>Support Us</h1>
                <p className={styles.lead}>
                    <strong>reactjs-virtual-keyboard</strong> is free and open source. If it saved you
                    time or you use it in a project, consider supporting its development — it keeps the
                    updates, fixes, and new features coming.
                </p>
            </div>

            <div className={styles.buttons}>
                {/* Buy Me a Coffee button — commented out until a real
                    buymeacoffee.com username is configured in config.ts
                <a
                    href={LINKS.buyMeACoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.coffeeBtn}`}
                >
                    ☕ Buy me a coffee
                </a>
                */}
                <a
                    href={LINKS.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.npmBtn}`}
                >
                    📦 View on npm
                </a>
                <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.githubBtn}`}
                >
                    ⭐ Star on GitHub
                </a>
                <a
                    href={LINKS.email}
                    className={`${styles.btn} ${styles.emailBtn}`}
                >
                    ✉️ Get in touch
                </a>
            </div>

            <section className={styles.support}>
                <h2>Other ways to support</h2>
                <ul className={styles.supportList}>
                    <li>⭐ Star the repository on GitHub</li>
                    <li>📦 Install the package and share it with your team</li>
                    <li>🐛 Report bugs or suggest features via GitHub issues</li>
                    <li>🤝 Contribute a pull request</li>
                    <li>📣 Share the project with other React developers</li>
                </ul>
            </section>

            <section className={styles.contact}>
                <h2>Questions or feedback?</h2>
                <p className={styles.lead}>
                    Found a bug, need help integrating, or want to collaborate? Reach out anytime —
                    I&apos;d love to hear how you&apos;re using the keyboard.
                </p>
                <a href={LINKS.email} className={styles.contactEmail}>
                    ✉️ {CONTACT_EMAIL}
                </a>
            </section>
        </div>
    );
}
