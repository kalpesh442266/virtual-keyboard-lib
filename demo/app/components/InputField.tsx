'use client';

import { RefObject } from 'react';
import { InputType } from '../types';

type InputFieldProps = {
  inputRef: RefObject<HTMLInputElement>;
  inputType: InputType;
  value: string;
  onChange: (value: string) => void;
};

export function InputField({ inputRef, inputType, value, onChange }: InputFieldProps) {
  return (
    <section className="demo-input">
      <input
        ref={inputRef}
        type={inputType}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Click to show the virtual keyboard"
      />
      <p className="helper">
        Current value: <strong>{value || '(empty)'}</strong>
      </p>
    </section>
  );
}

