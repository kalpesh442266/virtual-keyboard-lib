import type { FC } from 'react';
import type { VirtualKeyProps } from '../types';

export const VirtualKey: FC<VirtualKeyProps> = ({ keyValue, onClick, className = '' }) => {
  const keyClasses = ['vk-key', className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={keyClasses}
      onClick={() => onClick(keyValue)}
      data-testid={keyValue}
    >
      {keyValue}
    </button>
  );
};

export default VirtualKey;
