import { memo, type FC } from 'react';
import type { VirtualKeyProps } from '../types';

export const VirtualKey: FC<VirtualKeyProps> = memo(({ keyValue, onClick, className = '' }) => {
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
});

VirtualKey.displayName = 'VirtualKey';

export default VirtualKey;
