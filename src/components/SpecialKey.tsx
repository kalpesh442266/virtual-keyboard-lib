import type { FC } from 'react';
import type { SpecialKeyProps } from '../types';
import { useContinuousPress } from '../hooks';

export const SpecialKey: FC<SpecialKeyProps> = ({
  type,
  icon,
  onClick,
  extraClass = '',
  text,
  capsLock = false,
  enableContinuousPress = false,
}) => {
  const isCapsLockActive = type === 'caps' && capsLock;
  const keyClasses = [
    'vk-key',
    `vk-key--${extraClass}`,
    isCapsLockActive ? 'vk-key--caps-active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Use continuous press for backspace (hold to delete continuously)
  const continuousPressHandlers = useContinuousPress(onClick, {
    initialDelay: 500,
    interval: 50,
  });

  // Use continuous press handlers if enabled, otherwise use regular click
  const buttonHandlers = enableContinuousPress ? continuousPressHandlers : { onClick };

  return (
    <button
      type="button"
      className={keyClasses}
      data-testid={`${type}${isCapsLockActive ? '-active' : ''}`}
      data-key={isCapsLockActive ? `${type}-active` : type}
      {...buttonHandlers}
    >
      {icon && icon}
      {text && <span className="vk-key__text">{text}</span>}
    </button>
  );
};

export default SpecialKey;
