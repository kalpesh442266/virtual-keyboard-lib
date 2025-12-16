import { useEffect } from 'react';
import type { HardwareKeyboardHandlers } from '../types';

/**
 * Hook to keep virtual keyboard in sync with hardware keyboard events
 * (e.g., when pressing caps lock on hardware keyboard, virtual keyboard should reflect it)
 */
export function useHardwareKeyboard({
  isInputFocused,
  onBackspace,
  onEnter,
  onSpace,
  onCapsToggle,
  onKeyClick,
}: HardwareKeyboardHandlers): void {
  useEffect(() => {
    if (!isInputFocused) return;

    const handleKeyboardKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      switch (key) {
        case 'Backspace':
          event.preventDefault();
          event.stopPropagation();
          onBackspace();
          return;
        case 'Enter':
          event.preventDefault();
          onEnter();
          return;
        case ' ':
          event.preventDefault();
          onSpace();
          return;
        case 'CapsLock':
          event.preventDefault();
          onCapsToggle();
          return;
        default:
          if (key.length === 1) {
            event.preventDefault();
            onKeyClick(key);
          }
      }
    };

    document.addEventListener('keydown', handleKeyboardKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyboardKeyDown);
    };
  }, [isInputFocused, onBackspace, onEnter, onSpace, onCapsToggle, onKeyClick]);
}

export default useHardwareKeyboard;
