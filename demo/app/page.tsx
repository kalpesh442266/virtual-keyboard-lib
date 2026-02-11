'use client';

import { useState } from 'react';
import 'reactjs-virtual-keyboard/styles.css';

export default function HomePage() {
  return (
    <div className="docs-layout">
      <div className="docs-header">
        <h1>React Virtual Keyboard</h1>
        <p>A lightweight, customizable virtual keyboard component for React applications</p>
      </div>

      {/* Installation */}
      <section>
        <h2>⚡ Quick Start</h2>
        <h3>Installation</h3>
        <div className="code-block">
          <code>{`npm install reactjs-virtual-keyboard
# or
yarn add reactjs-virtual-keyboard
# or
pnpm add reactjs-virtual-keyboard`}</code>
        </div>

        <h3>Basic Usage</h3>
        <p className="helper">Import the CSS and use GlobalVirtualKeyboard component:</p>
        <div className="code-block">
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
        <ul style={{ fontSize: '16px', lineHeight: '2', color: '#cbd5e1' }}>
          <li>🎹 <strong>Multiple Layouts</strong> - QWERTY, symbols, and numeric keypad</li>
          <li>⌨️ <strong>Hardware Sync</strong> - Syncs with physical keyboard (Caps Lock, key presses)</li>
          <li>📱 <strong>Touch Optimized</strong> - Continuous press support (hold backspace)</li>
          <li>🎨 <strong>Highly Customizable</strong> - Custom layouts, key labels, themes, and more</li>
          <li>🪶 <strong>Lightweight</strong> - ~25 KB minified (~6 KB gzipped)</li>
          <li>📘 <strong>TypeScript</strong> - Full type definitions included</li>
        </ul>
      </section>

      {/* Bundle Size */}
      <section>
        <h2>📦 Bundle Size</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '24px 0' }}>
          <div style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#38bdf8' }}>24.74 kB</div>
            <div style={{ color: '#94a3b8', marginTop: '8px' }}>ESM (5.97 kB gzipped)</div>
          </div>
          <div style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#818cf8' }}>11.91 kB</div>
            <div style={{ color: '#94a3b8', marginTop: '8px' }}>CJS (4.46 kB gzipped)</div>
          </div>
          <div style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#34d399' }}>5.30 kB</div>
            <div style={{ color: '#94a3b8', marginTop: '8px' }}>CSS (1.49 kB gzipped)</div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2>📚 Next Steps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', margin: '24px 0' }}>
          <a href="/api-reference" style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937', textDecoration: 'none', color: 'inherit', transition: 'all 200ms' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📖</div>
            <h3 style={{ margin: '0 0 8px', color: '#e2e8f0' }}>API Reference</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Complete documentation of all props and utilities</p>
          </a>
          <a href="/playground" style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937', textDecoration: 'none', color: 'inherit', transition: 'all 200ms' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎮</div>
            <h3 style={{ margin: '0 0 8px', color: '#e2e8f0' }}>Playground</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Interactive prop customization and live preview</p>
          </a>
          <a href="/examples" style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937', textDecoration: 'none', color: 'inherit', transition: 'all 200ms' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💡</div>
            <h3 style={{ margin: '0 0 8px', color: '#e2e8f0' }}>Examples</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Real-world usage examples and patterns</p>
          </a>
        </div>
      </section>
    </div>
  );
}
