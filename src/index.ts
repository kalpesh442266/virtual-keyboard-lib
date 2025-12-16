// Main component exports
export { VirtualKeyboard } from './components/VirtualKeyboard';
export { VirtualKeyboardContainer } from './components/VirtualKeyboardContainer';
export { GlobalVirtualKeyboard } from './components/GlobalVirtualKeyboard';
export { KeyboardLayout } from './components/KeyboardLayout';
export { TextLayout } from './components/TextLayout';
export { NumbersLayout } from './components/NumbersLayout';
export { KeyboardRow } from './components/KeyboardRow';
export { VirtualKey } from './components/VirtualKey';
export { SpecialKey } from './components/SpecialKey';

// Hook exports
export { useCaretManager } from './hooks/useCaretManager';
export { useContinuousPress } from './hooks/useContinuousPress';
export { useHardwareKeyboard } from './hooks/useHardwareKeyboard';
export { useKeyboardScroll } from './hooks/useKeyboardScroll';

// Utility exports
export { setInputValueAndDispatchEvents } from './utils/inputEvents';
export { validateValueUtil, getInitialLayout } from './utils/validators';
export { scrollInputIntoView, resetScrollPosition } from './utils/scrollUtils';
export { onEnterClickUtil, handleValueChangeUtil, validateFocusInputs } from './utils/globalKeyboardUtils';

// Constant exports
export { QWERTY_LAYOUT, SYMBOLS_LAYOUT, NUMBERS_LAYOUT, DEFAULT_THEME } from './constants';

// Icon exports
export {
  BackspaceIcon,
  EnterIcon,
  SpacebarIcon,
  CapsLockIcon,
} from './components/icons';

// Type exports
export type {
  VirtualKeyboardProps,
  VirtualKeyboardTheme,
  KeyboardLayoutProps,
  TextLayoutProps,
  NumbersLayoutProps,
  VirtualKeyProps,
  SpecialKeyProps,
  KeyboardRowProps,
  ContinuousPressOptions,
  UseCaretManagerReturn,
  HardwareKeyboardHandlers,
  InputElement,
  LayoutType,
} from './types';

export type { GlobalVirtualKeyboardProps } from './components/GlobalVirtualKeyboard';
export type { UseKeyboardScrollReturn } from './hooks/useKeyboardScroll';

// Import styles (side effect)
import './styles.css';
