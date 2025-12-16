/**
 * Example usage of @hydrafacial/virtual-keyboard
 *
 * To run this example:
 * 1. Build the library: cd virtual-keyboard-lib && npm install && npm run build
 * 2. Create a new React project: npx create-vite my-app --template react-ts
 * 3. Copy this file to the new project
 * 4. Install the library: npm install ../virtual-keyboard-lib
 * 5. Import and use as shown below
 */

import { useRef, useState } from 'react';
import '../src/styles.css';
import { GlobalVirtualKeyboard } from '../src/components/GlobalVirtualKeyboard';

export default function KeyboardExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState<'text' | 'email' | 'number'>('text');
  const [theme, setTheme] = useState<string>('');

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Virtual Keyboard Demo</h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Input Type:
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value as 'text' | 'email' | 'number')}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '8px' }}>
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            <option value="">Default (Dark)</option>
            <option value="vk-container--light">Light</option>
            <option value="vk-container--blue">Blue</option>
            <option value="vk-container--purple">Purple</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '-200px' }}>
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Click to show virtual keyboard"
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '12px',
            fontSize: '18px',
            borderRadius: '8px',
            border: '2px solid #ccc',
          }}
        />
        <p style={{ color: '#666', marginTop: '8px' }}>
          Current value: <strong>{value || '(empty)'}</strong>
        </p>
      </div>
      <GlobalVirtualKeyboard />
    </div>
  );
}
