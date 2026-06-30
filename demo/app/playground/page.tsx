'use client';

import { useRef, useState } from 'react';
// @ts-ignore
import { VirtualKeyboard } from 'reactjs-virtual-keyboard';
import 'reactjs-virtual-keyboard/styles.css';
import docs from '../styles/docs.module.scss';
import styles from './page.module.scss';

const HIDEABLE_KEYS = ['capslock', 'space', 'enter', 'backspace'];

export default function PlaygroundPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // Layout props
    const [inputType, setInputType] = useState<string>('text');
    const [defaultLayout, setDefaultLayout] = useState<'letters' | 'symbols' | 'numbers'>('letters');

    // Behavior props
    const [syncHardware, setSyncHardware] = useState(true);
    const [initialDelay, setInitialDelay] = useState(500);
    const [interval, setInterval] = useState(50);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [scrollOffset, setScrollOffset] = useState(100);

    // Customization
    const [keyLabelsEnter, setKeyLabelsEnter] = useState('Enter');
    const [keyLabelsSpace, setKeyLabelsSpace] = useState('Space');
    const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

    // Theme
    const [bgColor, setBgColor] = useState('#1a1a1a');
    const [keyColor, setKeyColor] = useState('#2d2d2d');
    const [keyTextColor, setKeyTextColor] = useState('#ffffff');
    const [keyActiveColor, setKeyActiveColor] = useState('#666666');
    const [keyHoverColor, setKeyHoverColor] = useState('#555555');
    const [activeStateColor, setActiveStateColor] = useState('#4a90e2');
    const [keyBorderRadius, setKeyBorderRadius] = useState(8);
    const [keyHeight, setKeyHeight] = useState(48);

    const theme = {
        backgroundColor: bgColor,
        keyColor,
        keyTextColor,
        keyActiveColor,
        keyHoverColor,
        activeStateColor,
        keyBorderRadius: `${keyBorderRadius}px`,
        keyHeight: `${keyHeight}px`,
    };

    const keyLabels = {
        ...(keyLabelsEnter !== 'Enter' && { enter: keyLabelsEnter }),
        ...(keyLabelsSpace !== 'Space' && { space: keyLabelsSpace }),
    };

    const toggleHiddenKey = (key: string) => {
        setHiddenKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const themeChanged =
        bgColor !== '#1a1a1a' ||
        keyColor !== '#2d2d2d' ||
        keyTextColor !== '#ffffff' ||
        keyActiveColor !== '#666666' ||
        keyHoverColor !== '#555555' ||
        activeStateColor !== '#4a90e2' ||
        keyBorderRadius !== 8 ||
        keyHeight !== 48;

    const generateCode = () => {
        const props = [];

        if (inputType !== 'text') props.push(`inputType="${inputType}"`);
        if (defaultLayout !== 'letters') props.push(`defaultLayout="${defaultLayout}"`);
        if (!syncHardware) props.push('syncWithHardwareKeyboard={false}');
        if (initialDelay !== 500 || interval !== 50) {
            props.push(`continuousPressConfig={{ initialDelay: ${initialDelay}, interval: ${interval} }}`);
        }
        if (!scrollEnabled || scrollOffset !== 100) {
            props.push(`scrollConfig={{ enabled: ${scrollEnabled}, offset: ${scrollOffset} }}`);
        }
        if (Object.keys(keyLabels).length > 0) {
            props.push(`keyLabels={${JSON.stringify(keyLabels)}}`);
        }
        if (hiddenKeys.length > 0) {
            props.push(`hiddenKeys={${JSON.stringify(hiddenKeys)}}`);
        }
        if (themeChanged) {
            props.push(`theme={${JSON.stringify(theme, null, 2)}}`);
        }

        return `<VirtualKeyboard
  focusedInputRef={inputRef}
  isInputFocused={isInputFocused}
  ${props.join('\n  ')}
/>`;
    };

    return (
        <div className={docs.layout}>
            <div className={docs.header}>
                <h1 className={docs.title}>Interactive Playground</h1>
                <p className={docs.subtitle}>Customize all props and see changes in real-time</p>
            </div>

            <div className={styles.grid}>
                {/* Controls Panel */}
                <div>
                    <section>
                        <h2>Configuration</h2>

                        {/* Layout Props */}
                        <div className={styles.group}>
                            <h3>Layout & Type</h3>
                            <div className={styles.control}>
                                <label>Input Type</label>
                                <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
                                    <option value="text">text</option>
                                    <option value="email">email</option>
                                    <option value="number">number</option>
                                    {/* <option value="tel">tel</option>
                                    <option value="url">url</option> */}
                                </select>
                            </div>
                            <div className={styles.control}>
                                <label>Default Layout</label>
                                <select value={defaultLayout} onChange={(e) => setDefaultLayout(e.target.value as any)}>
                                    <option value="letters">letters</option>
                                    <option value="symbols">symbols</option>
                                    <option value="numbers">numbers</option>
                                </select>
                            </div>
                        </div>

                        {/* Behavior Props */}
                        <div className={styles.group}>
                            <h3>Behavior</h3>
                            <div className={styles.control}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={syncHardware}
                                        onChange={(e) => setSyncHardware(e.target.checked)}
                                    />
                                    Sync with Hardware Keyboard
                                </label>
                            </div>
                            <div className={styles.control}>
                                <label>Continuous Press Initial Delay: {initialDelay}ms</label>
                                <input
                                    type="range"
                                    min="100"
                                    max="1000"
                                    step="50"
                                    value={initialDelay}
                                    onChange={(e) => setInitialDelay(Number(e.target.value))}
                                    className={styles.range}
                                />
                            </div>
                            <div className={styles.control}>
                                <label>Continuous Press Interval: {interval}ms</label>
                                <input
                                    type="range"
                                    min="20"
                                    max="200"
                                    step="10"
                                    value={interval}
                                    onChange={(e) => setInterval(Number(e.target.value))}
                                    className={styles.range}
                                />
                            </div>
                            <div className={styles.control}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={scrollEnabled}
                                        onChange={(e) => setScrollEnabled(e.target.checked)}
                                    />
                                    Enable Auto-Scroll
                                </label>
                            </div>
                            {scrollEnabled && (
                                <div className={styles.control}>
                                    <label>Scroll Offset: {scrollOffset}px</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="300"
                                        step="10"
                                        value={scrollOffset}
                                        onChange={(e) => setScrollOffset(Number(e.target.value))}
                                        className={styles.range}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Key Customization */}
                        <div className={styles.group}>
                            <h3>Key Labels</h3>
                            <div className={styles.control}>
                                <label>Enter Key Label</label>
                                <input
                                    type="text"
                                    value={keyLabelsEnter}
                                    onChange={(e) => setKeyLabelsEnter(e.target.value)}
                                    className={styles.textInput}
                                />
                            </div>
                            <div className={styles.control}>
                                <label>Space Key Label</label>
                                <input
                                    type="text"
                                    value={keyLabelsSpace}
                                    onChange={(e) => setKeyLabelsSpace(e.target.value)}
                                    className={styles.textInput}
                                />
                            </div>
                        </div>

                        {/* Hidden Keys */}
                        <div className={styles.group}>
                            <h3>Hidden Keys</h3>
                            <div className={styles.chipRow}>
                                {HIDEABLE_KEYS.map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className={`${styles.chip} ${hiddenKeys.includes(key) ? styles.active : ''}`}
                                        onClick={() => toggleHiddenKey(key)}
                                    >
                                        {hiddenKeys.includes(key) ? '🙈' : '👁️'} {key}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Theme */}
                        <div className={styles.group}>
                            <h3>Theme</h3>
                            <div className={styles.control}>
                                <label>Background Color</label>
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className={styles.color} />
                            </div>
                            <div className={styles.control}>
                                <label>Key Color</label>
                                <input type="color" value={keyColor} onChange={(e) => setKeyColor(e.target.value)} className={styles.color} />
                            </div>
                            <div className={styles.control}>
                                <label>Key Text Color</label>
                                <input type="color" value={keyTextColor} onChange={(e) => setKeyTextColor(e.target.value)} className={styles.color} />
                            </div>
                            <div className={styles.control}>
                                <label>Key Active Color</label>
                                <input type="color" value={keyActiveColor} onChange={(e) => setKeyActiveColor(e.target.value)} className={styles.color} />
                            </div>
                            <div className={styles.control}>
                                <label>Key Hover Color</label>
                                <input type="color" value={keyHoverColor} onChange={(e) => setKeyHoverColor(e.target.value)} className={styles.color} />
                            </div>
                            <div className={styles.control}>
                                <label>Active State Color (Caps Lock on)</label>
                                <input type="color" value={activeStateColor} onChange={(e) => setActiveStateColor(e.target.value)} className={styles.color} />
                            </div>
                            <div className={styles.control}>
                                <label>Key Border Radius: {keyBorderRadius}px</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="24"
                                    step="1"
                                    value={keyBorderRadius}
                                    onChange={(e) => setKeyBorderRadius(Number(e.target.value))}
                                    className={styles.range}
                                />
                            </div>
                            <div className={styles.control}>
                                <label>Key Height: {keyHeight}px</label>
                                <input
                                    type="range"
                                    min="32"
                                    max="80"
                                    step="2"
                                    value={keyHeight}
                                    onChange={(e) => setKeyHeight(Number(e.target.value))}
                                    className={styles.range}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Preview Panel */}
                <div>
                    <section>
                        <h2>Live Preview</h2>
                        <div className={docs.demoInput}>
                            <input
                                ref={inputRef}
                                type={inputType}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                placeholder="Click to show keyboard"
                            />
                        </div>

                        {isInputFocused && (
                            <VirtualKeyboard
                                focusedInputRef={inputRef}
                                isInputFocused={isInputFocused}
                                inputType={inputType}
                                defaultLayout={defaultLayout}
                                syncWithHardwareKeyboard={syncHardware}
                                continuousPressConfig={{ initialDelay, interval }}
                                scrollConfig={{ enabled: scrollEnabled, offset: scrollOffset }}
                                keyLabels={keyLabels}
                                hiddenKeys={hiddenKeys}
                                theme={theme}
                            />
                        )}
                    </section>

                    <section>
                        <h2>Generated Code</h2>
                        <div className={docs.codeBlock}>
                            <code>{generateCode()}</code>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(generateCode())}
                            className={`${docs.button} ${styles.copyButton}`}
                        >
                            Copy Code
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
