# reactjs-virtual-keyboard

A lightweight, customizable virtual keyboard component for React applications. Features multiple layouts, multi-language support, hardware keyboard sync, extensive customization options, and full TypeScript support.

## ✨ Features

- **🎹 Multiple Layouts**: QWERTY letters, symbols, and numeric keypad
- **🌍 Multi-Language Support**: Built-in language switcher with custom language layouts
- **⌨️ Hardware Keyboard Sync**: Virtual keyboard syncs with physical keyboard (Caps Lock, key presses)
- **📱 Touch Optimized**: Continuous press support (hold backspace to delete)
- **🎨 Highly Customizable**: Custom layouts, key labels, disabled/hidden keys, render functions
- **🪶 Lightweight**: Only ~26 KB minified (~6.3 KB gzipped), no external dependencies
- **📘 TypeScript**: Full type definitions included
- **♿ Accessible**: Keyboard navigation and focus management

## 📦 Installation

```bash
npm install reactjs-virtual-keyboard
# or
yarn add reactjs-virtual-keyboard
# or
pnpm add reactjs-virtual-keyboard
```

## 🚀 Quick Start

### Option 1: GlobalVirtualKeyboard (Recommended)

Add once at your app root - automatically shows keyboard for all inputs:

```tsx
import { GlobalVirtualKeyboard } from 'reactjs-virtual-keyboard';
import 'reactjs-virtual-keyboard/styles.css';

function App() {
  return (
    <div>
      <input type="text" placeholder="Click any input!" />
      <input type="email" placeholder="Email" />
      <input type="number" placeholder="Numbers" />
      
      <GlobalVirtualKeyboard />
    </div>
  );
}
```

### Option 2: VirtualKeyboard (Manual Control)

For more control over when and where the keyboard appears:

```tsx
import { useRef, useState } from 'react';
import { VirtualKeyboard } from 'reactjs-virtual-keyboard';
import 'reactjs-virtual-keyboard/styles.css';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
      />

      {isInputFocused && (
        <VirtualKeyboard
          focusedInputRef={inputRef}
          isInputFocused={isInputFocused}
        />
      )}
    </div>
  );
}
```

## 📖 API Reference

### `<GlobalVirtualKeyboard />`

Automatically manages keyboard visibility for all inputs on the page.

```tsx
interface GlobalVirtualKeyboardProps {
  enabled?: boolean;                              // Enable/disable keyboard (default: true)
  className?: string;                              // Custom CSS class
  onVisibilityChange?: (visible: boolean) => void; // Visibility change callback
  onEnterClick?: () => void;                       // Enter key callback
  onChange?: (value: string) => void;              // Value change callback
}
```

**Example:**
```tsx
<GlobalVirtualKeyboard
  enabled={true}
  onEnterClick={() => console.log('Enter pressed!')}
  onChange={(value) => console.log('Value:', value)}
/>
```

---

### `<VirtualKeyboard />`

Main keyboard component with extensive customization options.

```tsx
interface VirtualKeyboardProps {
  // Required props
  focusedInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  isInputFocused: boolean;
  
  // Layout & behavior
  inputType?: 'text' | 'email' | 'number' | etc;  // HTML input type
  defaultLayout?: 'letters' | 'symbols' | 'numbers';
  syncWithHardwareKeyboard?: boolean;             // Enable hardware sync (default: true)
  
  // Callbacks
  onEnterClick?: () => void;
  onChange?: (value: string) => void;
  validate?: (value: string) => boolean;          // Custom validation
  
  // Customization
  className?: string;
  theme?: VirtualKeyboardTheme;
  customLayouts?: {
    letters?: string[][];
    symbols?: string[][];
    numbers?: string[][];
  };
  
  // Key customization
  keyLabels?: Record<string, string>;             // Custom key labels
  hiddenKeys?: string[];                          // Keys to hide
  disabledKeys?: string[];                        // Keys to disable
  renderKey?: (key: string, defaultRender: ReactNode) => ReactNode;
  renderSpecialKey?: (type: string, defaultRender: ReactNode) => ReactNode;
  
  // Behavior configuration
  continuousPressConfig?: {
    initialDelay?: number;                        // Default: 500ms
    interval?: number;                            // Default: 50ms
  };
  scrollConfig?: {
    enabled?: boolean;
    offset?: number;
  };
}
```

**Example with customization:**
```tsx
<VirtualKeyboard
  focusedInputRef={inputRef}
  isInputFocused={isInputFocused}
  
  // Custom key labels
  keyLabels={{
    enter: 'Submit',
    space: 'Space Bar',
    backspace: 'Del'
  }}
  
  // Hide specific keys
  hiddenKeys={['capslock']}
  
  // Disable certain keys
  disabledKeys={['@', '#']}
  
  // Custom layout
  customLayouts={{
    letters: [
      ['q', 'w', 'e', 'r', 't', 'y'],
      ['a', 's', 'd', 'f', 'g', 'h'],
      ['z', 'x', 'c', 'v', 'b', 'n']
    ]
  }}
  
  // Adjust continuous press behavior
  continuousPressConfig={{
    initialDelay: 300,
    interval: 40
  }}
  
  // Disable hardware keyboard sync
  syncWithHardwareKeyboard={false}
/>
```

---

## 🎨 Theming

### Using CSS Variables

```css
.vk-container {
  --vk-bg-color: #2c3e50;
  --vk-key-color: #34495e;
  --vk-key-text-color: #ecf0f1;
  --vk-key-active-color: #3498db;
  --vk-key-hover-color: #2c3e50;
  --vk-active-state-color: #e74c3c;
  --vk-key-border-radius: 8px;
  --vk-key-font-size: 18px;
  --vk-key-height: 50px;
}
```

### Theme Object

```tsx
const darkTheme = {
  backgroundColor: '#1a1a1a',
  keyColor: '#2d2d2d',
  keyTextColor: '#ffffff',
  keyActiveColor: '#0066cc',
  keyHoverColor: '#3d3d3d',
  activeStateColor: '#00cc66',
  keyBorderRadius: '6px',
  keyFontSize: '16px',
  keyHeight: '48px'
};

<VirtualKeyboard theme={darkTheme} {...props} />
```

---

## 🔧 Utility Functions & Hooks

For advanced use cases, you can import utilities directly:

```tsx
import {
  // Caret management
  createCaretManager,
  
  // Hardware keyboard event handling
  setupHardwareKeyboard,
  
  // Validation utilities
  validateValueUtil,
  getInitialLayout,
  
  // Scroll utilities
  scrollInputIntoView,
  resetScrollPosition,
  
  // Input value sync
  setInputValueAndDispatchEvents,
  
  // Hooks (only for React state/effects)
  useContinuousPress,
  useKeyboardScroll
} from 'reactjs-virtual-keyboard';
```

### `createCaretManager`

Pure function for managing caret position and text manipulation:

```tsx
import { createCaretManager } from 'reactjs-virtual-keyboard';

const inputRef = useRef<HTMLInputElement>(null);
const { insertText, backspace } = createCaretManager(() => inputRef.current);

// Insert text at caret position
insertText('Hello');

// Delete character before caret
backspace();
```

### `setupHardwareKeyboard`

Set up hardware keyboard event listeners:

```tsx
import { setupHardwareKeyboard } from 'reactjs-virtual-keyboard';

useEffect(() => {
  const cleanup = setupHardwareKeyboard({
    onBackspace: () => console.log('Backspace'),
    onEnter: () => console.log('Enter'),
    onSpace: () => console.log('Space'),
    onCapsToggle: () => console.log('Caps'),
    onKeyClick: (key) => console.log('Key:', key)
  });
  
  return cleanup; // Clean up listeners
}, []);
```

---

## 📱 Input Type Behaviors

The keyboard automatically adapts to different input types:

| Input Type | Layout | Special Keys | Validation |
|-----------|--------|--------------|------------|
| `text` | QWERTY | All | None |
| `email` | QWERTY + @ | Space, @ | Email chars only |
| `number` | Numbers only | Backspace, Enter | Digits only |
| `tel` | Numbers | Phone chars | Digits, +, - |
| `url` | QWERTY | .com, www. | URL chars |

---

## 🎯 Custom Layouts Example

```tsx
const customLayouts = {
  letters: [
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h', 'i', 'j'],
    ['k', 'l', 'm', 'n', 'o'],
    ['p', 'q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x', 'y', 'z']
  ],
  symbols: [
    ['!', '@', '#', '$', '%'],
    ['^', '&', '*', '(', ')'],
    ['-', '_', '=', '+', '['],
    [']', '{', '}', '|', '\\']
  ]
};

<VirtualKeyboard
  {...props}
  customLayouts={customLayouts}
/>
```

---

## 🎭 Custom Render Functions

```tsx
<VirtualKeyboard
  {...props}
  renderKey={(key, defaultRender) => (
    <div className="my-custom-key">
      {key.toUpperCase()}
    </div>
  )}
  renderSpecialKey={(type, defaultRender) => {
    if (type === 'enter') {
      return <button className="submit-btn">Submit</button>;
    }
    return defaultRender;
  }}
/>
```

---

## 📦 Bundle Size

- **ESM**: 26.14 kB minified (6.28 kB gzipped)
- **CJS**: 12.56 kB minified (4.69 kB gzipped)
- **CSS**: 6.03 kB (1.68 kB gzipped)

Tree-shaking enabled - import only what you need!

---

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- Requires React 16.8+ (hooks support)

---

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/yourusername/reactjs-virtual-keyboard.git

# Install dependencies
npm install

# Build library
npm run build

# Run demo (if available)
cd demo && npm install && npm run dev
```

---

## 📄 License

MIT © [Your Name]

---

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

## 📝 Changelog

### v2.0.0 (Latest)
- ✨ **New**: Multi-language support with built-in language switcher
- ✨ Added `languages`, `currentLanguage`, `onLanguageChange`, `showLanguageSwitcher` props
- ✨ Enhanced customization API (24+ new props)
- ⚡ Removed unnecessary hook wrappers for better performance
- 📦 Optimized bundle size with better tree-shaking
- 🏗️ Reorganized file structure for clarity
- 🔧 Exported utility functions for advanced usage
- 📘 Improved TypeScript types with ReadonlyArray support
- 📚 Complete documentation website with interactive playground

### v1.0.0
- 🎉 Initial release

