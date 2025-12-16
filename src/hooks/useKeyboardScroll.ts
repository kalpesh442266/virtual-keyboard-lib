import { useCallback, useEffect, RefObject } from 'react';
import { scrollInputIntoView, resetScrollPosition } from '../utils/scrollUtils';

export interface UseKeyboardScrollReturn {
  /** Scroll the input into view when keyboard appears */
  scrollInput: (input: HTMLInputElement | HTMLTextAreaElement) => void;
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
  const handleScrollInput = useCallback((input: HTMLInputElement | HTMLTextAreaElement) => {
    setTimeout(() => {
      if (!keyboardContainerRef?.current) return;
      scrollInputIntoView(input, keyboardContainerRef.current);
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

