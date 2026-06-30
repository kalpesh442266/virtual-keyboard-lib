'use client';

import { InputType } from '../types';
import styles from './ControlPanel.module.scss';

type ControlPanelProps = {
  inputType: InputType;
  theme: string;
  onInputTypeChange: (next: InputType) => void;
  onThemeChange: (next: string) => void;
};

export function ControlPanel({
  inputType,
  theme,
  onInputTypeChange,
  onThemeChange
}: ControlPanelProps) {
  return (
    <section className={styles.controls}>
      <label className={styles.control}>
        Input type
        <select value={inputType} onChange={(event) => onInputTypeChange(event.target.value as InputType)}>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
        </select>
      </label>

      <label className={styles.control}>
        Theme
        <select value={theme} onChange={(event) => onThemeChange(event.target.value)}>
          <option value="">Default (dark)</option>
          <option value="vk-container--light">Light</option>
          <option value="vk-container--blue">Blue</option>
          <option value="vk-container--purple">Purple</option>
        </select>
      </label>
    </section>
  );
}

