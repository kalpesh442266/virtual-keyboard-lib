# react-virtual-keyboard

A customizable virtual keyboard component for React applications. Features multiple keyboard layouts (QWERTY, symbols, numbers), hardware keyboard synchronization, touch device support, and full TypeScript support.

## Features

- **Multiple Layouts**: QWERTY letters, symbols, and numeric keypad layouts
- **Hardware Keyboard Sync**: Virtual keyboard state syncs with physical keyboard (e.g., Caps Lock)
- **Touch Optimized**: Designed for touch screens with continuous press support (hold backspace to delete)
- **Customizable Themes**: CSS variables for easy theming, plus built-in theme classes
- **TypeScript Support**: Full type definitions included
- **Accessible**: Keyboard navigation and focus management
- **Lightweight**: No external dependencies except React

## Installation

```bash
npm install react-virtual-keyboard
# or
yarn add react-virtual-keyboard
# or
pnpm add react-virtual-keyboard
```

## Quick Start

### Option 1: GlobalVirtualKeyboard (Easiest)

Add once at your app root - automatically shows keyboard when any input is focused:

```tsx
import { GlobalVirtualKeyboard } from 'react-virtual-keyboard';
import 'react-virtual-keyboard/styles.css';

function App() {
  return (
    <div>
      <input type="text" placeholder="Click me!" />
      <input type="email" placeholder="Email input" />
      <input type="number" placeholder="Number input" />
      
      {/* Add once - works for all inputs */}
      <GlobalVirtualKeyboard />
    </div>
  );
}
```

### Option 2: VirtualKeyboard (Manual Control)

For more control over when the keyboard appears:

```tsx
import { useRef, useState } from 'react';
import { VirtualKeyboard } from 'react-virtual-keyboard';
import 'react-virtual-keyboard/styles.css';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        placeholder="Click to show keyboard"
      />

      {isInputFocused && (
        <VirtualKeyboard
          focusedInputRef={inputRef}
          isInputFocused={isInputFocused}
          inputType="text"
          onEnterClick={() => console.log('Enter pressed!')}
          onChange={(newValue) => setValue(newValue)}
        />
      )}
    </div>
  );
}
```

## Components

### GlobalVirtualKeyboard

Automatically shows keyboard when any text input is focused. Best for most use cases.

```tsx
<GlobalVirtualKeyboard
  enabled={true}           // Enable/disable the keyboard
  className="my-theme"     // Custom CSS class
  onVisibilityChange={(visible) => {}}  // Called when keyboard shows/hides
  onEnterClick={() => {}}  // Called when Enter is pressed
  onChange={(value) => {}} // Called when value changes
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable the keyboard |
| `className` | `string` | - | Additional CSS class name |
| `onVisibilityChange` | `(isVisible: boolean) => void` | - | Callback when visibility changes |
| `onEnterClick` | `() => void` | - | Callback when Enter key is pressed |
| `onChange` | `(value: string) => void` | - | Callback when value changes |

### VirtualKeyboard

Manual control over keyboard display. Use when you need precise control.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focusedInputRef` | `RefObject<HTMLInputElement \| HTMLTextAreaElement>` | **required** | Ref to the currently focused input element |
| `isInputFocused` | `boolean` | **required** | Whether an input is currently focused |
| `inputType` | `HTMLInputTypeAttribute` | `'text'` | Type of input (affects layout and validation) |
| `onEnterClick` | `() => void` | - | Callback when Enter key is pressed |
| `onChange` | `(value: string) => void` | - | Callback when value changes |
| `className` | `string` | - | Additional CSS class name |
| `defaultLayout` | `'letters' \| 'symbols' \| 'numbers'` | `'letters'` | Default keyboard layout |
| `validate` | `(value: string) => boolean` | - | Custom validation function |

## Input Type Behaviors

The keyboard automatically adapts based on `inputType`:

- **`text`**: Shows QWERTY layout, allows all characters
- **`email`**: Shows QWERTY layout with quick access `.` and `@` keys
- **`number`**: Shows numeric keypad, only allows digits
- **`tel`**: Shows QWERTY layout, validates phone characters
- **`password`**: Shows QWERTY layout, allows all characters
- **`url`**: Shows QWERTY layout, validates URL characters

## Theming

### Using CSS Variables

```css
:root {
  --vk-bg-color: #1a1a1a;
  --vk-key-color: #444444;
  --vk-key-text-color: #ffffff;
  --vk-key-active-color: #666666;
  --vk-key-hover-color: #555555;
  --vk-active-state-color: #4a90e2;
  --vk-key-border-radius: 0.5vw;
  --vk-key-font-size: 32px;
  --vk-gap: 0.75vw;
  --vk-padding: 1vw;
  --vk-height: 35vh;
  --vk-z-index: 2001;
}
```

### Built-in Theme Classes

```tsx
<VirtualKeyboard
  className="vk-container--light"  // Light theme
  // or
  className="vk-container--blue"   // Blue theme
  // or
  className="vk-container--purple" // Purple theme
  {...props}
/>
```

### Custom Theme Example

```css
.my-custom-theme {
  --vk-bg-color: #2d3748;
  --vk-key-color: #4a5568;
  --vk-key-text-color: #e2e8f0;
  --vk-key-hover-color: #718096;
  --vk-key-active-color: #a0aec0;
  --vk-active-state-color: #48bb78;
}
```

## Hooks

### useCaretManager

Manages caret position and text insertion/deletion:

```tsx
import { useCaretManager } from 'react-virtual-keyboard';

function CustomKeyboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { insertText, backspace } = useCaretManager(inputRef);

  return (
    <button onClick={() => insertText('Hello')}>Insert Text</button>
    <button onClick={backspace}>Delete</button>
  );
}
```

### useContinuousPress

Handle hold-to-repeat functionality:

```tsx
import { useContinuousPress } from 'react-virtual-keyboard';

function DeleteButton({ onDelete }) {
  const handlers = useContinuousPress(onDelete, {
    initialDelay: 500, // Start repeating after 500ms
    interval: 50,      // Repeat every 50ms
  });

  return <button {...handlers}>Delete</button>;
}
```

### useHardwareKeyboard

Sync with physical keyboard events:

```tsx
import { useHardwareKeyboard } from 'react-virtual-keyboard';

function KeyboardHandler() {
  useHardwareKeyboard({
    isInputFocused: true,
    onBackspace: () => console.log('Backspace'),
    onEnter: () => console.log('Enter'),
    onSpace: () => console.log('Space'),
    onCapsToggle: () => console.log('Caps Lock'),
    onKeyClick: (key) => console.log('Key:', key),
  });
}
```

### useKeyboardScroll

Automatically scroll inputs into view when keyboard appears:

```tsx
import { useKeyboardScroll } from 'react-virtual-keyboard';

function MyComponent() {
  const { scrollInput, resetScroll } = useKeyboardScroll();

  const handleFocus = (e: FocusEvent) => {
    const input = e.target as HTMLInputElement;
    scrollInput(input); // Shifts content up if input would be covered
  };

  const handleBlur = () => {
    resetScroll(); // Restores original position
  };

  return <input onFocus={handleFocus} onBlur={handleBlur} />;
}
```

The hook automatically:
- Calculates if the input would be covered by the keyboard
- Smoothly transitions content up to keep input visible
- Resets position when keyboard hides
- Cleans up on component unmount

## Custom Layouts

You can use the individual layout components:

```tsx
import {
  KeyboardLayout,
  TextLayout,
  NumbersLayout,
  QWERTY_LAYOUT,
  SYMBOLS_LAYOUT,
  NUMBERS_LAYOUT,
} from 'react-virtual-keyboard';

// Use predefined layouts or create custom ones
const CUSTOM_LAYOUT = [
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I'],
];
```

## Accessibility

The keyboard includes:

- Focus management to prevent input blur when clicking keys
- `aria-label` attributes on special keys
- Keyboard navigation support
- Respects `prefers-reduced-motion` for animations

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## TypeScript

All types are exported:

```tsx
import type {
  VirtualKeyboardProps,
  VirtualKeyboardTheme,
  GlobalVirtualKeyboardProps,
  UseKeyboardScrollReturn,
  LayoutType,
  KeyboardLayoutProps,
} from 'react-virtual-keyboard';
```

## License

MIT © HydraFacial

