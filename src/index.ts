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

// Hook exports (only hooks that actually need React state/effects)
export { useContinuousPress } from './hooks/useContinuousPress';
export { useKeyboardScroll } from './hooks/useKeyboardScroll';

// Utility exports - pure functions for advanced usage
export {
  setInputValueAndDispatchEvents,
  validateValueUtil,
  getInitialLayout,
  scrollInputIntoView,
  resetScrollPosition,
  onEnterClickUtil,
  handleValueChangeUtil,
  validateFocusInputs,
  createCaretManager,
  setupHardwareKeyboard,
} from './utils';

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
  ContinuousPressConfig,
  ScrollConfig,
  UseCaretManagerReturn,
  HardwareKeyboardHandlers,
  InputElement,
  LayoutType,
} from './types';

export type { GlobalVirtualKeyboardProps } from './components/GlobalVirtualKeyboard';
export type { UseKeyboardScrollReturn } from './hooks/useKeyboardScroll';

// Import styles (side effect)
import './styles.css';
