import type { HTMLInputTypeAttribute, RefObject, ReactNode } from 'react';

export type LayoutType = 'letters' | 'symbols' | 'numbers';

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

export interface KeyboardLayoutProps {
  currentLayout: LayoutType;
  capsLock: boolean;
  onKeyClick: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onCapsToggle: () => void;
  onLayoutToggle: () => void;
  inputType: HTMLInputTypeAttribute;
}

export interface TextLayoutProps {
  inputType: HTMLInputTypeAttribute;
  currentLayoutData: string[][];
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  onCapsToggle: () => void;
  onLayoutToggle: () => void;
  onKeyClick: (key: string) => void;
  capsLock: boolean;
  currentLayout: LayoutType;
}

export interface NumbersLayoutProps {
  currentLayoutData: string[][];
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
}

export interface SpecialKeyProps {
  type: string;
  onClick: () => void;
  extraClass?: string;
  text?: string | null;
  icon?: ReactNode;
  capsLock?: boolean;
  enableContinuousPress?: boolean;
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
