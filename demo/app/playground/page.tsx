'use client';

import { useRef, useState } from 'react';
// @ts-ignore
import { VirtualKeyboard } from 'reactjs-virtual-keyboard';
import 'reactjs-virtual-keyboard/styles.css';

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

    const theme = {
        backgroundColor: bgColor,
        keyColor: keyColor,
        keyTextColor: keyTextColor,
    };

    const keyLabels = {
        ...(keyLabelsEnter !== 'Enter' && { enter: keyLabelsEnter }),
        ...(keyLabelsSpace !== 'Space' && { space: keyLabelsSpace }),
    };

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
        if (bgColor !== '#1a1a1a' || keyColor !== '#2d2d2d' || keyTextColor !== '#ffffff') {
            props.push(`theme={${JSON.stringify(theme, null, 2)}}`);
        }

        return `<VirtualKeyboard
  focusedInputRef={inputRef}
  isInputFocused={isInputFocused}
  ${props.join('\n  ')}
/>`;
    };

    return (
        <div className="docs-layout">
            <div className="docs-header">
                <h1>Interactive Playground</h1>
                <p>Customize all props and see changes in real-time</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Controls Panel */}
                <div>
                    <section>
                        <h2>Configuration</h2>

                        {/* Layout Props */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3>Layout & Type</h3>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label>Input Type</label>
                                <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
                                    <option value="text">text</option>
                                    <option value="email">email</option>
                                    <option value="number">number</option>
                                    <option value="tel">tel</option>
                                    <option value="url">url</option>
                                </select>
                            </div>
                            <div className="control">
                                <label>Default Layout</label>
                                <select value={defaultLayout} onChange={(e) => setDefaultLayout(e.target.value as any)}>
                                    <option value="letters">letters</option>
                                    <option value="symbols">symbols</option>
                                    <option value="numbers">numbers</option>
                                </select>
                            </div>
                        </div>

                        {/* Behavior Props */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3>Behavior</h3>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={syncHardware}
                                        onChange={(e) => setSyncHardware(e.target.checked)}
                                    />
                                    Sync with Hardware Keyboard
                                </label>
                            </div>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label>Continuous Press Initial Delay: {initialDelay}ms</label>
                                <input
                                    type="range"
                                    min="100"
                                    max="1000"
                                    step="50"
                                    value={initialDelay}
                                    onChange={(e) => setInitialDelay(Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label>Continuous Press Interval: {interval}ms</label>
                                <input
                                    type="range"
                                    min="20"
                                    max="200"
                                    step="10"
                                    value={interval}
                                    onChange={(e) => setInterval(Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={scrollEnabled}
                                        onChange={(e) => setScrollEnabled(e.target.checked)}
                                    />
                                    Enable Auto-Scroll
                                </label>
                            </div>
                            {scrollEnabled && (
                                <div className="control">
                                    <label>Scroll Offset: {scrollOffset}px</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="300"
                                        step="10"
                                        value={scrollOffset}
                                        onChange={(e) => setScrollOffset(Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Key Customization */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3>Key Labels</h3>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label>Enter Key Label</label>
                                <input
                                    type="text"
                                    value={keyLabelsEnter}
                                    onChange={(e) => setKeyLabelsEnter(e.target.value)}
                                    style={{ width: '100%', padding: '8px', background: '#0b1220', border: '1px solid #1f2937', borderRadius: '8px', color: '#e2e8f0' }}
                                />
                            </div>
                            <div className="control">
                                <label>Space Key Label</label>
                                <input
                                    type="text"
                                    value={keyLabelsSpace}
                                    onChange={(e) => setKeyLabelsSpace(e.target.value)}
                                    style={{ width: '100%', padding: '8px', background: '#0b1220', border: '1px solid #1f2937', borderRadius: '8px', color: '#e2e8f0' }}
                                />
                            </div>
                        </div>

                        {/* Theme */}
                        <div>
                            <h3>Theme</h3>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label>Background Color</label>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                                />
                            </div>
                            <div className="control" style={{ marginBottom: '16px' }}>
                                <label>Key Color</label>
                                <input
                                    type="color"
                                    value={keyColor}
                                    onChange={(e) => setKeyColor(e.target.value)}
                                    style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                                />
                            </div>
                            <div className="control">
                                <label>Key Text Color</label>
                                <input
                                    type="color"
                                    value={keyTextColor}
                                    onChange={(e) => setKeyTextColor(e.target.value)}
                                    style={{ width: '100%', height: '40px', cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Preview Panel */}
                <div>
                    <section>
                        <h2>Live Preview</h2>
                        <div className="demo-input" style={{ marginBottom: '24px' }}>
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
                        <div className="code-block">
                            <code style={{ whiteSpace: 'pre-wrap' }}>{generateCode()}</code>
                        </div>
                        <button
                            onClick={() => navigator.clipboard.writeText(generateCode())}
                            style={{
                                padding: '12px 24px',
                                background: '#38bdf8',
                                color: '#0f172a',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginTop: '16px'
                            }}
                        >
                            Copy Code
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
