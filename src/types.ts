import type { HTMLInputTypeAttribute, RefObject, ReactNode } from 'react';

export type LayoutType = 'letters' | 'symbols' | 'numbers';

export interface ContinuousPressConfig {
  /** Delay before continuous press starts (ms) */
  initialDelay?: number;
  /** Interval between repeated presses (ms) */
  interval?: number;
}

export interface ScrollConfig {
  /** Enable automatic scrolling when keyboard appears */
  enabled?: boolean;
  /** Additional offset padding (px) */
  offset?: number;
}

export interface VirtualKeyboardProps {
  /** Ref to the currently focused input element */
  focusedInputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  /** Whether an input is currently focused */
  isInputFocused: boolean;
  /** Type of the input element (affects layout and validation) */
  inputType?: HTMLInputTypeAttribute;
  /** Callback fired when Enter key is pressed */
  onEnterClick?: () => void;
  /** Callback fired when value changes */
  onChange?: (value: string) => void;
  /** Additional CSS class name */
  className?: string;
  /** Default layout to show ('letters' | 'symbols' | 'numbers') */
  defaultLayout?: LayoutType;
  /** Custom validation function */
  validate?: (value: string) => boolean;
  /** Theme configuration */
  theme?: VirtualKeyboardTheme;

  // Extended customization options
  /** Custom keyboard layouts (overrides default layouts) */
  customLayouts?: {
    letters?: string[][];
    symbols?: string[][];
    numbers?: string[][];
  };
  /** Continuous press configuration for backspace */
  continuousPressConfig?: ContinuousPressConfig;
  /** Scroll behavior configuration */
  scrollConfig?: ScrollConfig;
  /** Enable/disable hardware keyboard synchronization */
  syncWithHardwareKeyboard?: boolean;
  /** Custom key labels (e.g., { 'enter': 'Submit', 'space': 'Space Bar' }) */
  keyLabels?: Record<string, string>;
  /** Keys to hide from the keyboard */
  hiddenKeys?: string[];
  /** Keys to disable (grayed out and non-clickable) */
  disabledKeys?: string[];
  /** Custom render function for individual keys */
  renderKey?: (key: string, defaultRender: ReactNode) => ReactNode;
  /** Custom render function for special keys */
  renderSpecialKey?: (type: string, defaultRender: ReactNode) => ReactNode;

  // Multi-language support
  /** Multi-language keyboard layouts */
  languages?: {
    [languageCode: string]: {
      letters?: string[][];
      symbols?: string[][];
      numbers?: string[][];
      label?: string; // Display name for the language
    };
  };
  /** Currently selected language code */
  currentLanguage?: string;
  /** Callback when language changes */
  onLanguageChange?: (languageCode: string) => void;
  /** Show language switcher button */
  showLanguageSwitcher?: boolean;
}

export interface VirtualKeyboardTheme {
  /** Background color of the keyboard container */
  backgroundColor?: string;
  /** Color of the keys */
  keyColor?: string;
  /** Text color on keys */
  keyTextColor?: string;
  /** Active/pressed key background color */
  keyActiveColor?: string;
  /** Hover key background color */
  keyHoverColor?: string;
  /** Active state color (e.g., caps lock on) */
  activeStateColor?: string;
  /** Border radius for keys */
  keyBorderRadius?: string;
  /** Font size for keys */
  keyFontSize?: string;
  /** Key height */
  keyHeight?: string;
}

/**
 * Customization options shared by the keyboard layouts and forwarded to the
 * individual key components. All optional and backward compatible.
 */
export interface KeyCustomization {
  /** Custom labels for special keys keyed by type (e.g. { enter: 'Submit' }) */
  keyLabels?: Record<string, string>;
  /** Keys (or special-key identifiers) to hide from the keyboard */
  hiddenKeys?: string[];
  /** Keys (or special-key identifiers) to render disabled */
  disabledKeys?: string[];
  /** Custom render function for individual character keys */
  renderKey?: (key: string, defaultRender: ReactNode) => ReactNode;
  /** Custom render function for special keys */
  renderSpecialKey?: (type: string, defaultRender: ReactNode) => ReactNode;
  /** Continuous-press timing config for hold-to-repeat keys (backspace) */
  continuousPressConfig?: ContinuousPressConfig;
}

export interface KeyboardLayoutProps extends KeyCustomization {
  currentLayout: LayoutType;
  capsLock: boolean;
  onKeyClick: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onCapsToggle: () => void;
  onLayoutToggle: () => void;
  inputType?: HTMLInputTypeAttribute;
  customLayouts?: {
    letters?: string[][];
    symbols?: string[][];
    numbers?: string[][];
  };
}

export interface TextLayoutProps extends KeyCustomization {
  inputType?: HTMLInputTypeAttribute;
  currentLayoutData: ReadonlyArray<ReadonlyArray<string>> | string[][];
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onCapsToggle: () => void;
  onLayoutToggle: () => void;
  onKeyClick: (key: string) => void;
  capsLock: boolean;
  currentLayout: LayoutType;
}

export interface NumbersLayoutProps extends KeyCustomization {
  currentLayoutData: ReadonlyArray<ReadonlyArray<string>> | string[][];
  onBackspace: () => void;
  onEnter: () => void;
  onKeyClick: (key: string) => void;
  capsLock: boolean;
  currentLayout: LayoutType;
}

export interface VirtualKeyProps {
  keyValue: string;
  onClick: (key: string) => void;
  className?: string;
  disabled?: boolean;
  renderKey?: (key: string, defaultRender: ReactNode) => ReactNode;
}

export interface SpecialKeyProps {
  type: string;
  onClick: () => void;
  extraClass?: string;
  text?: string | null;
  icon?: ReactNode;
  capsLock?: boolean;
  enableContinuousPress?: boolean;
  disabled?: boolean;
  continuousPressConfig?: ContinuousPressConfig;
  renderSpecialKey?: (type: string, defaultRender: ReactNode) => ReactNode;
}

export interface KeyboardRowProps {
  children: ReactNode;
  className?: string;
}

export interface ContinuousPressOptions {
  initialDelay?: number;
  interval?: number;
  shouldPreventDefault?: boolean;
}

export interface UseCaretManagerReturn {
  insertText: (text: string) => void;
  backspace: () => void;
}

export interface HardwareKeyboardHandlers {
  isInputFocused: boolean;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onCapsToggle: () => void;
  onKeyClick: (key: string) => void;
}

export type InputElement = HTMLInputElement | HTMLTextAreaElement;
