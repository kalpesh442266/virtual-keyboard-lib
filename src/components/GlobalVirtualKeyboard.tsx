import { useEffect, useRef, useState, type FC } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { onEnterClickUtil, validateFocusInputs } from '../utils/globalKeyboardUtils';
import { useKeyboardScroll } from '../hooks/useKeyboardScroll';

export interface GlobalVirtualKeyboardProps {
  /**
   * Whether the virtual keyboard is enabled.
   * When false, the keyboard will not appear on input focus.
   * @default true
   */
  enabled?: boolean;
  /**
   * Additional CSS class name for the keyboard container
   */
  className?: string;
  /**
   * Callback fired when keyboard visibility changes
   */
  onVisibilityChange?: (isVisible: boolean) => void;
  /**
   * Callback fired when Enter key is pressed
   */
  onEnterClick?: () => void;
  /**
   * Callback fired when value changes
   */
  onChange?: (value: string) => void;
}

/**
 * GlobalVirtualKeyboard automatically shows a virtual keyboard when any
 * text input or textarea is focused. It handles:
 * - Automatic show/hide based on focus
 * - Scrolling inputs into view
 * - Form submission on Enter
 * - Input type detection for appropriate layouts
 *
 * @example
 * ```tsx
 * // Add once at the root of your app
 * function App() {
 *   return (
 *     <div>
 *       <YourAppContent />
 *       <GlobalVirtualKeyboard />
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With controlled visibility
 * function App() {
 *   const [keyboardEnabled, setKeyboardEnabled] = useState(true);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setKeyboardEnabled(!keyboardEnabled)}>
 *         Toggle Keyboard
 *       </button>
 *       <GlobalVirtualKeyboard enabled={keyboardEnabled} />
 *     </div>
 *   );
 * }
 * ```
 */
export const GlobalVirtualKeyboard: FC<GlobalVirtualKeyboardProps> = ({
  enabled = true,
  className,
  onVisibilityChange,
  onEnterClick,
  onChange,
}) => {
  const keyboardContainerRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [inputType, setInputType] = useState<string>('text');
  const focusedInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const originalInputTypeRef = useRef<string>('text');
  const { scrollInput, resetScroll } = useKeyboardScroll(keyboardContainerRef);

  useEffect(() => {
    if (!enabled) {
      // Only update state if visible, to avoid unnecessary renders
      if (isVisible) {
        setTimeout(() => {
          setIsVisible(false);
        }, 0);
        onVisibilityChange?.(false);
      }
      return;
    }

    // Single global event listener using event delegation
    const handleFocus = (event: Event) => {
      const input = validateFocusInputs(event);
      if (!input) return;

      // Check if it's a textarea or input
      const isTextarea = input.tagName === 'TEXTAREA';
      // Textareas behave like text inputs
      const detectedInputType = isTextarea ? 'text' : (input as HTMLInputElement).type;

      setInputType(detectedInputType);
      setIsVisible(true);
      onVisibilityChange?.(true);
      focusedInputRef.current = input;

      // Temporarily change input type to text for caret to work (only for input elements)
      if (!isTextarea) {
        originalInputTypeRef.current = (input as HTMLInputElement).type;
        if ((input as HTMLInputElement).type !== 'text') {
          // Save selection position before changing type (changing type resets caret to 0)
          const selectionStart = input.selectionStart;
          const selectionEnd = input.selectionEnd;

          (input as HTMLInputElement).type = 'text';

          // Restore caret position after type change
          const caretPos = selectionStart ?? input.value.length;
          const caretEnd = selectionEnd ?? caretPos;
          input.setSelectionRange(caretPos, caretEnd);
        }
      }

      // Scroll input into view after keyboard is shown
      scrollInput(input);
    };

    const handleBlur = (event: Event) => {
      const input = validateFocusInputs(event);
      if (!input) return;

      // Restore input type (only for input elements, not textarea)
      const isTextarea = input.tagName === 'TEXTAREA';
      if (!isTextarea) {
        (input as HTMLInputElement).type = originalInputTypeRef.current;
      }

      if (focusedInputRef.current === input) {
        focusedInputRef.current = null;
        setIsVisible(false);
        onVisibilityChange?.(false);

        // Reset scroll position when keyboard is hidden
        resetScroll();
      }
    };

    // Add single event listeners to document (event delegation)
    document.addEventListener('focusin', handleFocus, true);
    document.addEventListener('focusout', handleBlur, true);

    return () => {
      document.removeEventListener('focusin', handleFocus, true);
      document.removeEventListener('focusout', handleBlur, true);
    };
  }, [enabled, scrollInput, resetScroll, onVisibilityChange]);

  const handleEnterClick = () => {
    setIsVisible(false);
    onVisibilityChange?.(false);
    onEnterClickUtil(focusedInputRef);
    onEnterClick?.();

    // Reset scroll position when Enter is clicked
    resetScroll();
  };

  if (!isVisible || !enabled) {
    return null;
  }

  return (
    <span ref={keyboardContainerRef}>
      <VirtualKeyboard
        focusedInputRef={focusedInputRef}
        isInputFocused={isVisible}
        inputType={inputType}
        onEnterClick={handleEnterClick}
        onChange={onChange}
        className={className}
      />
    </span>
  );
};

export default GlobalVirtualKeyboard;

