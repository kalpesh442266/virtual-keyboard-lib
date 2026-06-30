import type { FC } from 'react';
import type { NumbersLayoutProps } from '../types';
import { BackspaceIcon, EnterIcon } from './icons';
import { SpecialKey } from './SpecialKey';
import { VirtualKey } from './VirtualKey';
import { KeyboardRow } from './KeyboardRow';
import { keyListMatches } from '../utils/keyboard-helpers';

export const NumbersLayout: FC<NumbersLayoutProps> = ({
  currentLayoutData,
  onBackspace,
  onEnter,
  onKeyClick,
  capsLock,
  keyLabels,
  hiddenKeys,
  disabledKeys,
  renderKey,
  renderSpecialKey,
  continuousPressConfig,
}) => {
  const labelFor = (fallback: string, ...aliases: string[]): string => {
    if (!keyLabels) return fallback;
    for (const alias of aliases) {
      const custom = keyLabels[alias] ?? keyLabels[alias.toLowerCase()];
      if (custom != null) return custom;
    }
    return fallback;
  };

  const isHidden = (...ids: string[]) => keyListMatches(hiddenKeys, ids);
  const isDisabled = (...ids: string[]) => keyListMatches(disabledKeys, ids);

  return (
    <div className="vk-layout vk-layout--numbers" data-testid="keyboard-layout">
      {currentLayoutData?.map((row, rowIndex) => (
        <KeyboardRow key={`num-row-${rowIndex}`}>
          {row?.map((key, keyIndex) => {
            if (isHidden(key)) return null;
            return (
              <VirtualKey
                key={`num-${rowIndex}-${keyIndex}-${key}`}
                keyValue={key}
                onClick={onKeyClick}
                disabled={isDisabled(key)}
                renderKey={renderKey}
              />
            );
          })}
          {rowIndex === 3 && !isHidden('enter') && (
            <SpecialKey
              key="enter-num"
              type="enter"
              icon={<EnterIcon />}
              onClick={onEnter}
              extraClass="enter-num"
              text={labelFor('Enter', 'enter')}
              capsLock={capsLock}
              disabled={isDisabled('enter')}
              renderSpecialKey={renderSpecialKey}
            />
          )}
          {rowIndex === 2 && !isHidden('backspace') && (
            <SpecialKey
              key="backspace-num"
              type="backspace"
              icon={<BackspaceIcon />}
              onClick={onBackspace}
              extraClass="backspace-num"
              text={labelFor('Backspace', 'backspace')}
              capsLock={capsLock}
              enableContinuousPress={true}
              continuousPressConfig={continuousPressConfig}
              disabled={isDisabled('backspace')}
              renderSpecialKey={renderSpecialKey}
            />
          )}
        </KeyboardRow>
      ))}
    </div>
  );
};

export default NumbersLayout;
