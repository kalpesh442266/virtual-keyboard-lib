import type { InputElement } from '../types';

/**
 * Update an input's value using the native setter (so React tracks it)
 * and dispatch bubbled, cancelable input/change events to notify listeners.
 */
export const setInputValueAndDispatchEvents = (
  input: InputElement,
  value: string,
  options: { skipValueAssignment?: boolean } = {}
): void => {
  const { skipValueAssignment = false } = options;

  if (!skipValueAssignment) {
    const proto = Object.getPrototypeOf(input);
    const valueSetter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;

    if (valueSetter) {
      valueSetter.call(input, value);
    }
  }

  input.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true }));
  input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
};
