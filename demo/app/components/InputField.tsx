'use client';

import { RefObject } from 'react';
import { InputType } from '../types';
import styles from './InputField.module.scss';

type InputFieldProps = {
  inputRef: RefObject<HTMLInputElement>;
  inputType: InputType;
  value: string;
  onChange: (value: string) => void;
};

export function InputField({ inputRef, inputType, value, onChange }: InputFieldProps) {
  return (
    <section className={styles.field}>
      <input
        ref={inputRef}
        type={inputType}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Click to show the virtual keyboard"
      />
      <p className={styles.helper}>
        Current value: <strong>{value || '(empty)'}</strong>
      </p>
    </section>
  );
}

