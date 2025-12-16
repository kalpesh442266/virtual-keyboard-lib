import type { FC } from 'react';
import type { KeyboardRowProps } from '../types';

export const KeyboardRow: FC<KeyboardRowProps> = ({ children, className = '' }) => {
  const rowClasses = ['vk-row', className].filter(Boolean).join(' ');

  return <div className={rowClasses}>{children}</div>;
};

export default KeyboardRow;
