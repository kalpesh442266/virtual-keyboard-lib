import { useCallback, useEffect, useMemo, useRef, useState, type FC } from 'react';
import type { VirtualKeyboardProps, LayoutType } from '../types';
import {
  createCaretManager,
  setupHardwareKeyboard,
  validateValueUtil,
  getInitialLayout,
  themeToCssVars,
  scrollInputIntoView,
  resetScrollPosition,
} from '../utils';
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
  theme,
  syncWithHardwareKeyboard = true,
  customLayouts,
  continuousPressConfig,
  scrollConfig,
  keyLabels,
  hiddenKeys,
  disabledKeys,
  renderKey,
  renderSpecialKey,
  languages,
  currentLanguage,
  onLanguageChange,
  showLanguageSwitcher = false,
}) => {
  const [capsLock, setCapsLock] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || Object.keys(languages || {})[0] || 'en');
  const { insertText, backspace } = createCaretManager(() => focusedInputRef.current);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentLayout, setCurrentLayout] = useState<LayoutType>(() =>
    getInitialLayout(inputType, defaultLayout)
  );

  // Keep selected language in sync when the controlled prop changes
  useEffect(() => {
    if (currentLanguage) setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

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
    insertText(' ');
    onChange?.(focusedInputRef.current?.value || '');
  }, [insertText, onChange, focusedInputRef]);

  const handleCapsToggle = useCallback(() => {
    setCapsLock((prev) => !prev);
  }, []);

  // Update layout when input type changes
  useEffect(() => {
    setCurrentLayout(getInitialLayout(inputType, defaultLayout));
  }, [inputType, defaultLayout]);

  const keysHandlers = {
    onBackspace: handleBackspace,
    onEnter: handleEnter,
    onSpace: handleSpace,
    onCapsToggle: handleCapsToggle,
    onKeyClick: handleKeyClick,
  };

  // Setup hardware keyboard sync
  useEffect(() => {
    if (!isInputFocused || !syncWithHardwareKeyboard) return;
    return setupHardwareKeyboard(keysHandlers);
  }, [
    isInputFocused,
    syncWithHardwareKeyboard,
    handleKeyClick,
    handleBackspace,
    handleEnter,
    handleSpace,
    handleCapsToggle,
  ]);

  // Scroll the focused input into view when the keyboard appears (opt-out via
  // scrollConfig.enabled = false). Shifts sibling content up so the keyboard
  // does not cover the active input.
  useEffect(() => {
    if (scrollConfig?.enabled === false) return;
    if (!isInputFocused) return;

    const input = focusedInputRef.current;
    const container = containerRef.current;
    if (!input || !container) return;

    const id = setTimeout(() => {
      scrollInputIntoView(input, container, scrollConfig?.offset);
    }, 0);

    return () => {
      clearTimeout(id);
      resetScrollPosition();
    };
  }, [isInputFocused, focusedInputRef, scrollConfig?.enabled, scrollConfig?.offset]);

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    onLanguageChange?.(lang);
  };

  // Determine active layouts (language-specific or custom or default)
  const activeLayouts = languages?.[selectedLanguage] || customLayouts;

  // Map the theme prop to CSS custom properties applied on the container
  const themeStyle = useMemo(() => themeToCssVars(theme), [theme]);

  return (
    <VirtualKeyboardContainer ref={containerRef} className={className} style={themeStyle}>
      {showLanguageSwitcher && languages && Object.keys(languages).length > 1 && (
        <div className="vk-language-switcher">
          {Object.entries(languages).map(([code, config]) => (
            <button
              key={code}
              type="button"
              className={`vk-lang-btn ${selectedLanguage === code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(code)}
            >
              {config.label || code.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <KeyboardLayout
        capsLock={capsLock}
        currentLayout={currentLayout}
        onKeyClick={handleKeyClick}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
        onSpace={handleSpace}
        onCapsToggle={handleCapsToggle}
        onLayoutToggle={() => setCurrentLayout((prev) => (prev === 'letters' ? 'symbols' : 'letters'))}
        inputType={inputType}
        customLayouts={activeLayouts}
        keyLabels={keyLabels}
        hiddenKeys={hiddenKeys}
        disabledKeys={disabledKeys}
        renderKey={renderKey}
        renderSpecialKey={renderSpecialKey}
        continuousPressConfig={continuousPressConfig}
      />
    </VirtualKeyboardContainer>
  );
};

export default VirtualKeyboard;
