'use client';

import { useState, useRef } from 'react';
// @ts-ignore
import { VirtualKeyboard } from 'reactjs-virtual-keyboard';
import 'reactjs-virtual-keyboard/styles.css';

export default function ExamplesPage() {
    return (
        <div className="docs-layout">
            <div className="docs-header">
                <h1>Examples</h1>
                <p>Real-world usage patterns and common scenarios</p>
            </div>

            {/* Example 1: Multi-Language Support */}
            <section>
                <h2>🌍 Multi-Language Keyboard</h2>
                <p className="helper">Support multiple languages with custom keyboard layouts and built-in language switcher.</p>
                <MultiLanguageExample />
            </section>

            {/* Example 2: Form Validation */}
            <section>
                <h2>✅ Form Validation</h2>
                <p className="helper">Use custom validation to restrict valid input values.</p>
                <EmailExample />
            </section>

            {/* Example 3: Custom Key Labels */}
            <section>
                <h2>🏷️ Custom Key Labels</h2>
                <p className="helper">Customize key labels for specific use cases (e.g., "Submit" instead of "Enter").</p>
                <div className="code-block">
                    <code>{`<VirtualKeyboard
  {...props}
  keyLabels={{
    enter: 'Submit',
    space: 'Space Bar',
    backspace: 'Delete'
  }}
/>`}</code>
                </div>
            </section>

            {/* Example 4: Hidden Keys */}
            <section>
                <h2>👁️ Hiding Specific Keys</h2>
                <p className="helper">Hide keys that aren't needed for your use case.</p>
                <div className="code-block">
                    <code>{`<VirtualKeyboard
  {...props}
  hiddenKeys={['capslock', '@', '#']}
/>`}</code>
                </div>
            </section>

            {/* Example 5: Custom Theme */}
            <section>
                <h2>🎨 Custom Theme</h2>
                <p className="helper">Create a custom theme to match your app's design.</p>
                <div className="code-block">
                    <code>{`const neonTheme = {
  backgroundColor: '#0a0a0a',
  keyColor: '#1a1a2e',
  keyTextColor: '#00ff9f',
  keyActiveColor: '#ff00ff',
  keyHoverColor: '#16213e',
  activeStateColor: '#00ff9f',
  keyBorderRadius: '8px',
  keyFontSize: '18px',
  keyHeight: '50px'
};

<VirtualKeyboard theme={neonTheme} {...props} />`}</code>
                </div>
            </section>

            {/* Example 6: Disable Hardware Sync */}
            <section>
                <h2>⌨️ Disable Hardware Keyboard Sync</h2>
                <p className="helper">Prevent virtual keyboard from syncing with physical keyboard.</p>
                <div className="code-block">
                    <code>{`<VirtualKeyboard
  syncWithHardwareKeyboard={false}
  {...props}
/>`}</code>
                </div>
            </section>

            {/* Example 7: Continuous Press */}
            <section>
                <h2>⏱️ Adjust Continuous Press Timing</h2>
                <p className="helper">Make backspace repeat faster or slower when held down.</p>
                <div className="code-block">
                    <code>{`<VirtualKeyboard
  continuousPressConfig={{
    initialDelay: 300,  // Start repeating after 300ms
    interval: 30        // Repeat every 30ms
  }}
  {...props}
/>`}</code>
                </div>
            </section>
        </div>
    );
}

function MultiLanguageExample() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [value, setValue] = useState('');
    const [currentLang, setCurrentLang] = useState('en');

    // Define multi-language layouts
    const multiLanguageLayouts = {
        en: {
            label: '🇺🇸 English',
            letters: [
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
            ],
        },
        es: {
            label: '🇪🇸 Español',
            letters: [
                ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
                ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
                ['á', 'é', 'í', 'ó', 'ú', 'ü'],
            ],
        },
        fr: {
            label: '🇫🇷 Français',
            letters: [
                ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
                ['w', 'x', 'c', 'v', 'b', 'n'],
                ['à', 'â', 'é', 'è', 'ê', 'ë', 'î', 'ï', 'ô', 'ù', 'û', 'ü', 'ç'],
            ],
        },
        de: {
            label: '🇩🇪 Deutsch',
            letters: [
                ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
                ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
                ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'ß'],
            ],
        },
    };

    return (
        <div style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <div className="demo-input" style={{ marginBottom: '16px' }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Type in any language..."
                />
                <div style={{ marginTop: '8px', color: '#94a3b8', fontSize: '14px' }}>
                    Current language: <strong>{multiLanguageLayouts[currentLang as keyof typeof multiLanguageLayouts]?.label}</strong>
                </div>
            </div>

            {isInputFocused && (
                <VirtualKeyboard
                    focusedInputRef={inputRef}
                    isInputFocused={isInputFocused}
                    languages={multiLanguageLayouts}
                    currentLanguage={currentLang}
                    onLanguageChange={setCurrentLang}
                    showLanguageSwitcher={true}
                    onChange={setValue}
                />
            )}

            <div style={{ marginTop: '24px' }} className="code-block">
                <code>{`const languages = {
  en: {
    label: '🇺🇸 English',
    letters: [['q', 'w', 'e', ...], ['a', 's', 'd', ...], ...]
  },
  es: {
    label: '🇪🇸 Español',
    letters: [['q', 'w', 'e', ...], ['a', 's', 'd', ..., 'ñ'], ...]
  },
  // ... more languages
};

<VirtualKeyboard
  languages={languages}
  currentLanguage={currentLang}
  onLanguageChange={setCurrentLang}
  showLanguageSwitcher={true}
  {...props}
/>`}</code>
            </div>
        </div>
    );
}

function EmailExample() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        setError(isValid || value === '' ? '' : 'Invalid email format');
        return true;
    };

    return (
        <div style={{ background: '#0b1220', padding: '24px', borderRadius: '12px', border: '1px solid #1f2937' }}>
            <div className="demo-input" style={{ marginBottom: '16px' }}>
                <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Enter your email"
                />
                {error && <div style={{ color: '#ef4444', marginTop: '8px', fontSize: '14px' }}>{error}</div>}
            </div>

            {isInputFocused && (
                <VirtualKeyboard
                    focusedInputRef={inputRef}
                    isInputFocused={isInputFocused}
                    inputType="email"
                    onChange={setEmail}
                    validate={validateEmail}
                />
            )}

            <div style={{ marginTop: '24px' }} className="code-block">
                <code>{`const validateEmail = (value: string) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  setError(emailRegex.test(value) ? '' : 'Invalid');
  return true;
};

<VirtualKeyboard
  inputType="email"
  validate={validateEmail}
  {...props}
/>`}</code>
            </div>
        </div>
    );
}
