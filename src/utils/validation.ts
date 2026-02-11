import type { HTMLInputTypeAttribute } from 'react';
import type { LayoutType } from '../types';

/**
 * Validates a single character based on input type
 */
export const validateValueUtil = (
  value: string,
  inputType: HTMLInputTypeAttribute
): boolean => {
  switch (inputType) {
    case 'number':
      // Only allow digits
      return /^[0-9]*$/.test(value);

    case 'email':
      // Allow alphanumeric, @, ., _, -, +
      return /^[a-zA-Z0-9@._+-]*$/.test(value);

    case 'tel':
      // Only allow digits, +, -, (, ), spaces
      return /^[0-9+\-() ]*$/.test(value);

    case 'url':
      // Allow basic URL characters
      return /^[a-zA-Z0-9:/._-]*$/.test(value);

    case 'password':
      // Allow all characters for password
      return true;

    default:
      return true; // allow all characters for text input
  }
};

/**
 * Get the initial layout based on input type
 */
export const getInitialLayout = (
  inputType: HTMLInputTypeAttribute,
  defaultLayout: LayoutType
): LayoutType => {
  if (inputType === 'number') {
    return 'numbers';
  }
  return defaultLayout;
};
