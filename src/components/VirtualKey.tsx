import { memo, type FC } from 'react';
import type { VirtualKeyProps } from '../types';

export const VirtualKey: FC<VirtualKeyProps> = memo(
  ({ keyValue, onClick, className = '', disabled = false, renderKey }) => {
    const keyClasses = ['vk-key', className].filter(Boolean).join(' ');

    const defaultRender = (
      <button
        type="button"
        className={keyClasses}
        onClick={() => onClick(keyValue)}
        disabled={disabled}
        data-testid={keyValue}
      >
        {keyValue}
      </button>
    );

    if (renderKey) {
      return <>{renderKey(keyValue, defaultRender)}</>;
    }

    return defaultRender;
  }
);

VirtualKey.displayName = 'VirtualKey';

export default VirtualKey;
