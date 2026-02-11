'use client';

import { useCallback, useRef, useState } from 'react';
// @ts-ignore
import { GlobalVirtualKeyboard } from 'reactjs-virtual-keyboard';
import { ControlPanel } from './ControlPanel';
import { InputField } from './InputField';
import { InputType } from '../types';

export function GlobalKeyboardDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [inputType, setInputType] = useState<InputType>('text');
  const [theme, setTheme] = useState('');

  const handleEnterClick = useCallback(() => {
    console.info('Enter pressed!');
  }, []);

  return (
    <section>
      <h2>GlobalVirtualKeyboard (auto attach)</h2>
      <p className="helper">Add once at app root — it appears whenever any input is focused.</p>
      <ControlPanel
        inputType={inputType}
        theme={theme}
        onInputTypeChange={(next) => setInputType(next)}
        onThemeChange={(next) => setTheme(next)}
      />
      <InputField
        inputRef={inputRef}
        inputType={inputType}
        value={value}
        onChange={setValue}
      />
      <GlobalVirtualKeyboard
        className={theme}
        onEnterClick={handleEnterClick}
        onChange={setValue}
      />
    </section>
  );
}

