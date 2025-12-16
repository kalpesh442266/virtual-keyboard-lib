import type { FC } from 'react';
import type { NumbersLayoutProps } from '../types';
import { BackspaceIcon, EnterIcon } from './icons';
import { SpecialKey } from './SpecialKey';
import { VirtualKey } from './VirtualKey';
import { KeyboardRow } from './KeyboardRow';

export const NumbersLayout: FC<NumbersLayoutProps> = ({
  currentLayoutData,
  onBackspace,
  onEnter,
  onKeyClick,
  capsLock,
}) => {
  return (
    <div className="vk-layout vk-layout--numbers" data-testid="keyboard-layout">
      {currentLayoutData?.map((row, rowIndex) => (
        <KeyboardRow key={`num-row-${rowIndex}`}>
          {row?.map((key, keyIndex) => (
            <VirtualKey
              key={`num-${rowIndex}-${keyIndex}-${key}`}
              keyValue={key}
              onClick={onKeyClick}
            />
          ))}
          {rowIndex === 3 && (
            <SpecialKey
              key="enter-num"
              type="enter"
              icon={<EnterIcon />}
              onClick={onEnter}
              extraClass="enter-num"
              text="Enter"
              capsLock={capsLock}
            />
          )}
          {rowIndex === 2 && (
            <SpecialKey
              key="backspace-num"
              type="backspace"
              icon={<BackspaceIcon />}
              onClick={onBackspace}
              extraClass="backspace-num"
              text="Backspace"
              capsLock={capsLock}
              enableContinuousPress={true}
            />
          )}
        </KeyboardRow>
      ))}
    </div>
  );
};

export default NumbersLayout;
