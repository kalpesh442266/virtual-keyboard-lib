import type { InputElement, UseCaretManagerReturn } from '../types';
import { setInputValueAndDispatchEvents } from './input-value-sync';

/**
 * Creates a caret manager for manipulating text in input elements.
 * This is a pure utility that doesn't use React hooks.
 * 
 * @param getInputRef - Function that returns the current input element ref
 * @returns Object with insertText and backspace functions
 * 
 * @example
 * ```tsx
 * const inputRef = useRef<HTMLInputElement>(null);
 * const { insertText, backspace } = createCaretManager(() => inputRef.current);
 * ```
 */
export function createCaretManager(
    getInputRef: () => InputElement | null
): UseCaretManagerReturn {
    /**
     * Insert text at the current caret position or replace selected text
     */
    const insertText = (text: string): void => {
        const input = getInputRef();
        if (!input) return;
        if (input.readOnly || input.disabled) return;

        const startRaw = input.selectionStart;
        const endRaw = input.selectionEnd;
        const start = startRaw == null ? input.value.length : startRaw;
        const end = endRaw == null ? input.value.length : endRaw;

        const scrollTop = (input as HTMLTextAreaElement).scrollTop ?? 0;
        const scrollLeft = (input as HTMLTextAreaElement).scrollLeft ?? 0;

        // Calculate new value
        const newValue = input.value.slice(0, start) + text + input.value.slice(end);
        const caretAfter = start + text.length;

        // Set value and dispatch events
        setInputValueAndDispatchEvents(input, newValue);

        // Restore focus & selection
        input.focus();
        input.setSelectionRange(caretAfter, caretAfter);

        if ('scrollTop' in input) {
            (input as HTMLTextAreaElement).scrollTop = scrollTop;
            (input as HTMLTextAreaElement).scrollLeft = scrollLeft;
        }
    };

    /**
     * Delete selected text or the character before the caret
     */
    const backspace = (): void => {
        const input = getInputRef();
        if (!input) return;
        if (input.readOnly || input.disabled) return;

        const startRaw = input.selectionStart;
        const endRaw = input.selectionEnd;
        const start = startRaw == null ? input.value.length : startRaw;
        const end = endRaw == null ? input.value.length : endRaw;

        const scrollTop = (input as HTMLTextAreaElement).scrollTop ?? 0;
        const scrollLeft = (input as HTMLTextAreaElement).scrollLeft ?? 0;

        // If selection present -> delete selection
        if (start !== end) {
            const newValue = input.value.slice(0, start) + input.value.slice(end);
            setInputValueAndDispatchEvents(input, newValue);
            input.focus();
            input.setSelectionRange(start, start);
        } else if (start > 0) {
            const newValue = input.value.slice(0, start - 1) + input.value.slice(start);
            const newCaret = start - 1;

            setInputValueAndDispatchEvents(input, newValue);
            input.focus();
            input.setSelectionRange(newCaret, newCaret);
        }

        if ('scrollTop' in input) {
            (input as HTMLTextAreaElement).scrollTop = scrollTop;
            (input as HTMLTextAreaElement).scrollLeft = scrollLeft;
        }
    };

    return {
        insertText,
        backspace,
    };
}
