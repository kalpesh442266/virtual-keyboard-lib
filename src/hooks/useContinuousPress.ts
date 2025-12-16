import { useCallback, useRef } from 'react';
import type { ContinuousPressOptions } from '../types';

/**
 * Hook for handling continuous press events (like holding backspace to delete multiple characters)
 */
export function useContinuousPress(
  onPress: () => void,
  {
    initialDelay = 500,
    interval = 50,
    shouldPreventDefault = true,
  }: ContinuousPressOptions = {}
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    onPress();
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(onPress, interval);
    }, initialDelay);
  }, [onPress, initialDelay, interval]);

  return {
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      start();
    },
    onTouchStart: (e: React.TouchEvent) => {
      if (shouldPreventDefault) e.preventDefault();
      start();
    },
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: (e: React.TouchEvent) => {
      if (shouldPreventDefault) e.preventDefault();
      clear();
    },
  };
}

export default useContinuousPress;
