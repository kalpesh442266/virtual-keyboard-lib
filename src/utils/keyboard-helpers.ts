import type { CSSProperties, RefObject } from 'react';
import { setInputValueAndDispatchEvents } from './input-value-sync';
import type { VirtualKeyboardTheme } from '../types';

type FocusedInputRef = RefObject<HTMLInputElement | HTMLTextAreaElement | null>;

/**
 * Map a VirtualKeyboardTheme object to the CSS custom properties consumed by
 * the keyboard stylesheet. Returns a style object that can be spread onto the
 * keyboard container. Only defined theme keys produce variables, so partial
 * themes work and undefined keys fall back to the stylesheet defaults.
 */
export const themeToCssVars = (theme?: VirtualKeyboardTheme): CSSProperties => {
  if (!theme) return {};

  const mapping: Record<keyof VirtualKeyboardTheme, string> = {
    backgroundColor: '--vk-bg-color',
    keyColor: '--vk-key-color',
    keyTextColor: '--vk-key-text-color',
    keyActiveColor: '--vk-key-active-color',
    keyHoverColor: '--vk-key-hover-color',
    activeStateColor: '--vk-active-state-color',
    keyBorderRadius: '--vk-key-border-radius',
    keyFontSize: '--vk-key-font-size',
    keyHeight: '--vk-key-height',
  };

  const vars: Record<string, string> = {};
  for (const key of Object.keys(mapping) as Array<keyof VirtualKeyboardTheme>) {
    const value = theme[key];
    if (value !== undefined && value !== null && value !== '') {
      vars[mapping[key]] = String(value);
    }
  }

  return vars as CSSProperties;
};

/**
 * Case-insensitive check of whether any of the given identifiers appears in a
 * key list (used for hiddenKeys / disabledKeys matching). A character key
 * passes its own value; a special key passes its type plus aliases.
 */
export const keyListMatches = (
  list: string[] | undefined,
  identifiers: Array<string | undefined>
): boolean => {
  if (!list || list.length === 0) return false;
  const set = new Set(list.map((item) => item.toLowerCase()));
  return identifiers.some((id) => id != null && set.has(id.toLowerCase()));
};

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

