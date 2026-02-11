import type { HardwareKeyboardHandlers } from '../types';

/**
 * Sets up hardware keyboard event listeners to sync with virtual keyboard.
 * This is a pure utility that returns a cleanup function.
 * 
 * @param handlers - Handlers for keyboard events
 * @returns Cleanup function to remove event listeners
 * 
 * @example
 * ```tsx
 * useEffect(() => {
 *   if (!isInputFocused) return;
 *   return setupHardwareKeyboard({
 *     onBackspace: handleBackspace,
 *     onEnter: handleEnter,
 *     // ...
 *   });
 * }, [isInputFocused, handleBackspace, handleEnter]);
 * ```
 */
export function setupHardwareKeyboard(
    handlers: Omit<HardwareKeyboardHandlers, 'isInputFocused'>
): () => void {
    const { onBackspace, onEnter, onSpace, onCapsToggle, onKeyClick } = handlers;

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
}
