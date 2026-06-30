import { useCallback, useEffect, RefObject } from 'react';
import { scrollInputIntoView, resetScrollPosition } from '../utils/scrollUtils';

export interface UseKeyboardScrollReturn {
  /** Scroll the input into view when keyboard appears (optional extra offset in px) */
  scrollInput: (input: HTMLInputElement | HTMLTextAreaElement, offset?: number) => void;
  /** Reset scroll position when keyboard hides */
  resetScroll: () => void;
}

/**
 * Hook to handle keyboard scrolling for input elements.
 * Automatically shifts content up when the virtual keyboard would cover the input.
 *
 * @returns Object with scroll and reset functions
 *
 * @example
 * ```tsx
 * const { scrollInput, resetScroll } = useKeyboardScroll();
 *
 * // When input is focused
 * scrollInput(inputElement);
 *
 * // When keyboard is hidden
 * resetScroll();
 * ```
 */
export function useKeyboardScroll(keyboardContainerRef: RefObject<HTMLSpanElement | null>): UseKeyboardScrollReturn {
  // Scroll input into view when keyboard appears
  const handleScrollInput = useCallback((input: HTMLInputElement | HTMLTextAreaElement, offset?: number) => {
    setTimeout(() => {
      if (!keyboardContainerRef?.current) return;
      scrollInputIntoView(input, keyboardContainerRef.current, offset);
    }, 0);
  }, [keyboardContainerRef]);

  // Reset scroll position
  const handleResetScroll = useCallback(() => {
    resetScrollPosition();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetScrollPosition();
    };
  }, []);

  return {
    scrollInput: handleScrollInput,
    resetScroll: handleResetScroll,
  };
}

export default useKeyboardScroll;

