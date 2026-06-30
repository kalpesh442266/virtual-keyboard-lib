'use client';

import Link from 'next/link';
import 'reactjs-virtual-keyboard/styles.css';
import docs from './styles/docs.module.scss';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={docs.layout}>
      <div className={docs.header}>
        <h1 className={docs.title}>React Virtual Keyboard</h1>
        <p className={docs.subtitle}>A lightweight, customizable virtual keyboard component for React applications</p>
      </div>

      {/* Installation */}
      <section>
        <h2>⚡ Quick Start</h2>
        <h3>Installation</h3>
        <div className={docs.codeBlock}>
          <code>{`npm install reactjs-virtual-keyboard
# or
yarn add reactjs-virtual-keyboard
# or
pnpm add reactjs-virtual-keyboard`}</code>
        </div>

        <h3>Basic Usage</h3>
        <p className={docs.helper}>Import the CSS and use GlobalVirtualKeyboard component:</p>
        <div className={docs.codeBlock}>
          <code>{`import { GlobalVirtualKeyboard } from 'reactjs-virtual-keyboard';
import 'reactjs-virtual-keyboard/styles.css';

function App() {
  return (
    <div>
      <input type="text" placeholder="Click me!" />
      <GlobalVirtualKeyboard />
    </div>
  );
}`}</code>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2>✨ Features</h2>
        <ul className={styles.featureList}>
          <li>🎹 <strong>Multiple Layouts</strong> - QWERTY, symbols, and numeric keypad</li>
          <li>⌨️ <strong>Hardware Sync</strong> - Syncs with physical keyboard (Caps Lock, key presses)</li>
          <li>📱 <strong>Touch Optimized</strong> - Continuous press support (hold backspace)</li>
          <li>🎨 <strong>Highly Customizable</strong> - Custom layouts, key labels, themes, and more</li>
          <li>🪶 <strong>Lightweight</strong> - ~32 KB minified (~7.4 KB gzipped)</li>
          <li>📘 <strong>TypeScript</strong> - Full type definitions included</li>
        </ul>
      </section>

      {/* Bundle Size */}
      <section>
        <h2>📦 Bundle Size</h2>
        <div className={docs.cardGrid}>
          <div className={docs.card}>
            <div className={styles.statValue}>32.12 kB</div>
            <div className={styles.statLabel}>ESM (7.40 kB gzipped)</div>
          </div>
          <div className={docs.card}>
            <div className={`${styles.statValue} ${styles.statValueAlt}`}>15.67 kB</div>
            <div className={styles.statLabel}>CJS (5.58 kB gzipped)</div>
          </div>
          <div className={docs.card}>
            <div className={`${styles.statValue} ${styles.statValueGreen}`}>6.16 kB</div>
            <div className={styles.statLabel}>CSS (1.73 kB gzipped)</div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2>📚 Next Steps</h2>
        <div className={docs.cardGrid}>
          <Link href="/api-reference" className={docs.linkCard}>
            <div className={styles.cardIcon}>📖</div>
            <h3 className={styles.cardTitle}>API Reference</h3>
            <p className={styles.cardText}>Complete documentation of all props and utilities</p>
          </Link>
          <Link href="/playground" className={docs.linkCard}>
            <div className={styles.cardIcon}>🎮</div>
            <h3 className={styles.cardTitle}>Playground</h3>
            <p className={styles.cardText}>Interactive prop customization and live preview</p>
          </Link>
          <Link href="/examples" className={docs.linkCard}>
            <div className={styles.cardIcon}>💡</div>
            <h3 className={styles.cardTitle}>Examples</h3>
            <p className={styles.cardText}>Real-world usage examples and patterns</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
