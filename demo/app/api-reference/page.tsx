'use client';

export default function APIReferencePage() {
    return (
        <div className="docs-layout">
            <div className="docs-header">
                <h1>API Reference</h1>
                <p>Complete documentation of all components, props, hooks, and utilities</p>
            </div>

            {/* VirtualKeyboard */}
            <section id="virtual-keyboard">
                <h2>VirtualKeyboard</h2>
                <p className="helper">The main keyboard component with extensive customization options.</p>

                <h3>Required Props</h3>
                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>focusedInputRef</code></td>
                            <td><code>RefObject&lt;HTMLInputElement | HTMLTextAreaElement&gt;</code></td>
                            <td>Ref to the currently focused input element</td>
                        </tr>
                        <tr>
                            <td><code>isInputFocused</code></td>
                            <td><code>boolean</code></td>
                            <td>Whether an input is currently focused</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Layout & Type Props</h3>
                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>inputType</code></td>
                            <td><code>HTMLInputTypeAttribute</code></td>
                            <td><code>'text'</code></td>
                            <td>HTML input type (affects layout and validation)</td>
                        </tr>
                        <tr>
                            <td><code>defaultLayout</code></td>
                            <td><code>'letters' | 'symbols' | 'numbers'</code></td>
                            <td><code>'letters'</code></td>
                            <td>Initial keyboard layout to display</td>
                        </tr>
                        <tr>
                            <td><code>customLayouts</code></td>
                            <td><code>&#123; letters?: string[][], symbols?: string[][], numbers?: string[][] &#125;</code></td>
                            <td><code>undefined</code></td>
                            <td>Override default keyboard layouts</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Callback Props</h3>
                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>onChange</code></td>
                            <td><code>(value: string) =&gt; void</code></td>
                            <td>Called when input value changes</td>
                        </tr>
                        <tr>
                            <td><code>onEnterClick</code></td>
                            <td><code>() =&gt; void</code></td>
                            <td>Called when Enter key is pressed</td>
                        </tr>
                        <tr>
                            <td><code>validate</code></td>
                            <td><code>(value: string) =&gt; boolean</code></td>
                            <td>Custom validation function</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Customization Props</h3>
                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>keyLabels</code></td>
                            <td><code>Record&lt;string, string&gt;</code></td>
                            <td><code>&#123;&#125;</code></td>
                            <td>Custom labels for keys (e.g., &#123; 'enter': 'Submit' &#125;)</td>
                        </tr>
                        <tr>
                            <td><code>hiddenKeys</code></td>
                            <td><code>string[]</code></td>
                            <td><code>[]</code></td>
                            <td>Array of keys to hide from keyboard</td>
                        </tr>
                        <tr>
                            <td><code>disabledKeys</code></td>
                            <td><code>string[]</code></td>
                            <td><code>[]</code></td>
                            <td>Array of keys to disable (grayed out)</td>
                        </tr>
                        <tr>
                            <td><code>renderKey</code></td>
                            <td><code>(key: string, defaultRender: ReactNode) =&gt; ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Custom render function for individual keys</td>
                        </tr>
                        <tr>
                            <td><code>renderSpecialKey</code></td>
                            <td><code>(type: string, defaultRender: ReactNode) =&gt; ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Custom render function for special keys</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Behavior Props</h3>
                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>syncWithHardwareKeyboard</code></td>
                            <td><code>boolean</code></td>
                            <td><code>true</code></td>
                            <td>Enable/disable hardware keyboard synchronization</td>
                        </tr>
                        <tr>
                            <td><code>continuousPressConfig</code></td>
                            <td><code>&#123; initialDelay?: number, interval?: number &#125;</code></td>
                            <td><code>&#123; initialDelay: 500, interval: 50 &#125;</code></td>
                            <td>Configuration for hold-to-repeat behavior</td>
                        </tr>
                        <tr>
                            <td><code>scrollConfig</code></td>
                            <td><code>&#123; enabled?: boolean, offset?: number &#125;</code></td>
                            <td><code>&#123; enabled: true &#125;</code></td>
                            <td>Auto-scroll configuration when keyboard appears</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Theming Props</h3>
                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>className</code></td>
                            <td><code>string</code></td>
                            <td>Additional CSS class name</td>
                        </tr>
                        <tr>
                            <td><code>theme</code></td>
                            <td><code>VirtualKeyboardTheme</code></td>
                            <td>Theme configuration object (see Theme Type below)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* GlobalVirtualKeyboard */}
            <section id="global-virtual-keyboard">
                <h2>GlobalVirtualKeyboard</h2>
                <p className="helper">Automatically shows keyboard when any input is focused.</p>

                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>enabled</code></td>
                            <td><code>boolean</code></td>
                            <td><code>true</code></td>
                            <td>Enable/disable the global keyboard</td>
                        </tr>
                        <tr>
                            <td><code>className</code></td>
                            <td><code>string</code></td>
                            <td><code>undefined</code></td>
                            <td>Custom CSS class name</td>
                        </tr>
                        <tr>
                            <td><code>onVisibilityChange</code></td>
                            <td><code>(visible: boolean) =&gt; void</code></td>
                            <td><code>undefined</code></td>
                            <td>Called when keyboard visibility changes</td>
                        </tr>
                        <tr>
                            <td><code>onEnterClick</code></td>
                            <td><code>() =&gt; void</code></td>
                            <td><code>undefined</code></td>
                            <td>Called when Enter key is pressed</td>
                        </tr>
                        <tr>
                            <td><code>onChange</code></td>
                            <td><code>(value: string) =&gt; void</code></td>
                            <td><code>undefined</code></td>
                            <td>Called when input value changes</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Theme Type */}
            <section id="theme-type">
                <h2>VirtualKeyboardTheme</h2>
                <p className="helper">Theme configuration object for customizing keyboard appearance.</p>

                <table className="api-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>backgroundColor</code></td>
                            <td><code>string</code></td>
                            <td>Background color of keyboard container</td>
                        </tr>
                        <tr>
                            <td><code>keyColor</code></td>
                            <td><code>string</code></td>
                            <td>Default key background color</td>
                        </tr>
                        <tr>
                            <td><code>keyTextColor</code></td>
                            <td><code>string</code></td>
                            <td>Text color on keys</td>
                        </tr>
                        <tr>
                            <td><code>keyActiveColor</code></td>
                            <td><code>string</code></td>
                            <td>Key color when pressed</td>
                        </tr>
                        <tr>
                            <td><code>keyHoverColor</code></td>
                            <td><code>string</code></td>
                            <td>Key color on hover</td>
                        </tr>
                        <tr>
                            <td><code>activeStateColor</code></td>
                            <td><code>string</code></td>
                            <td>Color for active states (e.g., Caps Lock on)</td>
                        </tr>
                        <tr>
                            <td><code>keyBorderRadius</code></td>
                            <td><code>string</code></td>
                            <td>Border radius for keys</td>
                        </tr>
                        <tr>
                            <td><code>keyFontSize</code></td>
                            <td><code>string</code></td>
                            <td>Font size for key labels</td>
                        </tr>
                        <tr>
                            <td><code>keyHeight</code></td>
                            <td><code>string</code></td>
                            <td>Height of keys</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Utility Functions */}
            <section id="utilities">
                <h2>Utility Functions</h2>
                <p className="helper">Pure functions exported for advanced usage.</p>

                <h3>createCaretManager</h3>
                <div className="code-block">
                    <code>{`function createCaretManager(
  getInputRef: () => HTMLInputElement | HTMLTextAreaElement | null
): {
  insertText: (text: string) => void;
  backspace: () => void;
}`}</code>
                </div>
                <p className="helper">Creates a caret manager for manipulating text in input elements.</p>

                <h3>setupHardwareKeyboard</h3>
                <div className="code-block">
                    <code>{`function setupHardwareKeyboard(handlers: {
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onCapsToggle: () => void;
  onKeyClick: (key: string) => void;
}): () => void // Returns cleanup function`}</code>
                </div>
                <p className="helper">Sets up hardware keyboard event listeners. Returns cleanup function.</p>
            </section>

            {/* Hooks */}
            <section id="hooks">
                <h2>Hooks</h2>
                <p className="helper">React hooks for state management and effects.</p>

                <h3>useContinuousPress</h3>
                <div className="code-block">
                    <code>{`function useContinuousPress(
  callback: () => void,
  options?: {
    enableContinuousPress?: boolean;
    delay?: number;
    interval?: number;
  }
): {
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
}`}</code>
                </div>
                <p className="helper">Implements hold-to-repeat functionality (e.g., for backspace key).</p>

                <h3>useKeyboardScroll</h3>
                <div className="code-block">
                    <code>{`function useKeyboardScroll(
  keyboardRef: RefObject<HTMLElement>
): {
  scrollInput: (input: HTMLElement) => void;
  resetScroll: () => void;
}`}</code>
                </div>
                <p className="helper">Manages scrolling input elements into view when keyboard appears.</p>
            </section>
        </div>
    );
}
