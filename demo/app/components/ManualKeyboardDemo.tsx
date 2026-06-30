'use client';

import { useCallback, useRef, useState } from 'react';
// @ts-ignore
import { VirtualKeyboard } from 'reactjs-virtual-keyboard';
import { ControlPanel } from './ControlPanel';
import { InputType } from '../types';
import docs from '../styles/docs.module.scss';

export function ManualKeyboardDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState<InputType>('text');
  const [theme, setTheme] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleEnterClick = useCallback(() => {
    console.info('Enter pressed (manual keyboard)!');
  }, []);

  return (
    <section>
      <h2>VirtualKeyboard (manual control)</h2>
      <p className={docs.helper}>Mount and show the keyboard yourself for specific inputs only.</p>
      <ControlPanel
        inputType={inputType}
        theme={theme}
        onInputTypeChange={(next) => setInputType(next)}
        onThemeChange={(next) => setTheme(next)}
      />
      <section className={docs.demoInput}>
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Focus to mount the manual keyboard"
        />
        <p className={docs.helper}>
          Current value: <strong>{value || '(empty)'}</strong>
        </p>
      </section>

      {isInputFocused && (
        <VirtualKeyboard
          focusedInputRef={inputRef}
          isInputFocused={isInputFocused}
          inputType={inputType}
          className={theme}
          onEnterClick={handleEnterClick}
          onChange={setValue}
        />
      )}
    </section>
  );
}

