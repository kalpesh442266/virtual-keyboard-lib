import { memo, type FC } from 'react';
import type { SpecialKeyProps } from '../types';
import { useContinuousPress } from '../hooks';

export const SpecialKey: FC<SpecialKeyProps> = memo((props) => {
  const {
    type,
    icon,
    onClick,
    extraClass = '',
    text,
    capsLock = false,
    enableContinuousPress = false,
    disabled = false,
    continuousPressConfig,
    renderSpecialKey,
  } = props;

  const isCapsLockActive = type === 'caps' && capsLock;
  const keyClasses = [
    'vk-key',
    `vk-key--${extraClass}`,
    isCapsLockActive ? 'vk-key--caps-active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Use continuous press for backspace (hold to delete continuously).
  // Timing is configurable via continuousPressConfig, falling back to defaults.
  const continuousPressHandlers = useContinuousPress(onClick, {
    initialDelay: continuousPressConfig?.initialDelay ?? 500,
    interval: continuousPressConfig?.interval ?? 50,
  });

  // Use continuous press handlers if enabled, otherwise use regular click.
  // Continuous-press handlers are skipped when the key is disabled.
  const buttonHandlers =
    enableContinuousPress && !disabled ? continuousPressHandlers : { onClick };

  const defaultRender = (
    <button
      type="button"
      className={keyClasses}
      data-testid={`${type}${isCapsLockActive ? '-active' : ''}`}
      data-key={isCapsLockActive ? `${type}-active` : type}
      disabled={disabled}
      {...buttonHandlers}
    >
      {icon && icon}
      {text && <span className="vk-key__text">{text}</span>}
    </button>
  );

  if (renderSpecialKey) {
    return <>{renderSpecialKey(type, defaultRender)}</>;
  }

  return defaultRender;
});

SpecialKey.displayName = 'SpecialKey';

export default SpecialKey;
