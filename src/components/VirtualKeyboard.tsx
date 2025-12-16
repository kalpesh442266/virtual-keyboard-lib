import { useCallback, useEffect, useState, type FC } from 'react';
import type { VirtualKeyboardProps, LayoutType } from '../types';
import { useCaretManager, useHardwareKeyboard } from '../hooks';
import { validateValueUtil, getInitialLayout } from '../utils';
import { KeyboardLayout } from './KeyboardLayout';
import { VirtualKeyboardContainer } from './VirtualKeyboardContainer';

/**
 * Virtual Keyboard Component
 *
 * A customizable on-screen keyboard for React applications.
 * Supports multiple layouts (QWERTY, symbols, numbers), hardware keyboard sync,
 * and touch device compatibility.
 */
export const VirtualKeyboard: FC<VirtualKeyboardProps> = ({
  focusedInputRef,
  isInputFocused,
  inputType = 'text',
  onEnterClick,
  onChange,
  className,
  defaultLayout = 'letters',
  validate,
}) => {
  const [capsLock, setCapsLock] = useState(false);
  const { insertText, backspace } = useCaretManager(focusedInputRef);

  const [currentLayout, setCurrentLayout] = useState<LayoutType>(() =>
    getInitialLayout(inputType, defaultLayout)
  );

  const updateValue = useCallback(
    (next: string) => {
      // Run custom validation if provided
      if (validate && !validate(next)) return;

      // Run default validation based on input type
      if (!validateValueUtil(next, inputType)) return;

      insertText(next);
      onChange?.(focusedInputRef.current?.value ?? '');
    },
    [focusedInputRef, inputType, insertText, onChange, validate]
  );

  // Memoized handlers to avoid dependency issues
  const handleKeyClick = useCallback(
    (key: string) => {
      updateValue(key);
    },
    [updateValue]
  );

  const handleBackspace = useCallback(() => {
    if (focusedInputRef.current?.value.length === 0) return;
    backspace();
    onChange?.(focusedInputRef.current?.value ?? '');
  }, [backspace, focusedInputRef, onChange]);

  const handleEnter = useCallback(() => {
    onEnterClick?.();
  }, [onEnterClick]);

  const handleSpace = useCallback(() => {
    updateValue(' ');
  }, [updateValue]);

  const handleCapsToggle = useCallback(() => {
    setCapsLock((prev) => !prev);
  }, []);

  const handleLayoutToggle = useCallback(() => {
    if (inputType === 'number') {
      // For number inputs, don't allow switching away from numbers layout
      return;
    }
    setCurrentLayout((prev) => (prev === 'letters' ? 'symbols' : 'letters'));
  }, [inputType]);

  // Update layout when input type changes

  useEffect(() => {
    setCurrentLayout(getInitialLayout(inputType, defaultLayout));
    // Only update if dependencies change, but functionally mirrors the initial state
  }, [inputType, defaultLayout]);

  const keysHandlers = {
    onBackspace: handleBackspace,
    onEnter: handleEnter,
    onSpace: handleSpace,
    onCapsToggle: handleCapsToggle,
    onKeyClick: handleKeyClick,
  };

  useHardwareKeyboard({
    isInputFocused,
    ...keysHandlers,
  });

  return (
    <VirtualKeyboardContainer className={className}>
      <KeyboardLayout
        currentLayout={currentLayout}
        capsLock={capsLock}
        {...keysHandlers}
        onLayoutToggle={handleLayoutToggle}
        inputType={inputType}
      />
    </VirtualKeyboardContainer>
  );
};

export default VirtualKeyboard;
