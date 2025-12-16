import type { RefObject } from 'react';
import { setInputValueAndDispatchEvents } from './inputEvents';

type FocusedInputRef = RefObject<HTMLInputElement | HTMLTextAreaElement | null>;

/**
 * Handle Enter key click - blur input and submit form if applicable
 */
export const onEnterClickUtil = (focusedInputRef: FocusedInputRef): void => {
  if (focusedInputRef.current) {
    const input = focusedInputRef.current;
    input.blur();

    // If it's a form then submit the form
    input.form?.submit();
  }
};

/**
 * Handle value change on the focused input
 */
export const handleValueChangeUtil = (focusedInputRef: FocusedInputRef, value: string): void => {
  const input = focusedInputRef.current;
  if (!input) return;

  setInputValueAndDispatchEvents(input, value);
};

/**
 * Validate if the focused element should show the virtual keyboard
 * Returns the input/textarea element or null if it shouldn't show keyboard
 */
export const validateFocusInputs = (
  event: Event
): HTMLInputElement | HTMLTextAreaElement | null => {
  const target = event.target as HTMLElement;

  // Check if the focused element matches our criteria
  const isInput = target.tagName === 'INPUT';
  const isTextarea = target.tagName === 'TEXTAREA';

  if (isTextarea) {
    return target as HTMLTextAreaElement;
  }

  if (isInput) {
    const input = target as HTMLInputElement;
    const excludedTypes = [
      'checkbox',
      'radio',
      'range',
      'date',
      'time',
      'color',
      'month',
      'week',
      'file',
      'hidden',
      'submit',
      'reset',
      'button',
      'image',
    ];

    if (excludedTypes.includes(input.type)) return null;
    return input;
  }

  return null;
};

