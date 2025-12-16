import type { FC } from 'react';
import type { TextLayoutProps } from '../types';
import { BackspaceIcon, EnterIcon, SpacebarIcon, CapsLockIcon } from './icons';
import { SpecialKey } from './SpecialKey';
import { VirtualKey } from './VirtualKey';
import { KeyboardRow } from './KeyboardRow';

export const TextLayout: FC<TextLayoutProps> = ({
  inputType,
  currentLayoutData,
  onBackspace,
  onEnter,
  onSpace,
  onCapsToggle,
  onLayoutToggle,
  onKeyClick,
  capsLock,
  currentLayout,
}) => {
  const renderSpecialKeysLeft = (rowIndex: number) => {
    switch (rowIndex) {
      case 3:
        return (
          currentLayout === 'letters' && (
            <SpecialKey
              key="caps"
              type="caps"
              icon={<CapsLockIcon />}
              onClick={onCapsToggle}
              extraClass="capsLock"
              text="Caps Lock"
              capsLock={capsLock}
            />
          )
        );
      default:
        return null;
    }
  };

  const renderSpecialKeysRight = (rowIndex: number) => {
    switch (rowIndex) {
      case 3:
        return (
          <SpecialKey
            key="backspace"
            type="backspace"
            icon={<BackspaceIcon />}
            onClick={onBackspace}
            extraClass="backspace"
            text="Backspace"
            enableContinuousPress={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="vk-layout vk-layout--text" data-testid="keyboard-layout">
      {currentLayoutData?.map((row, rowIndex) => (
        <KeyboardRow key={`row-${rowIndex}`}>
          {renderSpecialKeysLeft(rowIndex)}
          {row.map((key, keyIndex) => {
            const displayKey = capsLock ? key.toUpperCase() : key.toLowerCase();
            return (
              <VirtualKey
                key={`${rowIndex}-${keyIndex}-${key}`}
                keyValue={displayKey}
                onClick={onKeyClick}
              />
            );
          })}
          {renderSpecialKeysRight(rowIndex)}
        </KeyboardRow>
      ))}

      <KeyboardRow>
        <SpecialKey
          key="layout"
          type="layout"
          icon={currentLayout === 'letters' ? '&123' : 'ABC'}
          onClick={onLayoutToggle}
          extraClass="layout"
          text=""
        />
        {inputType === 'email' && (
          <SpecialKey
            key="dot"
            type="dot"
            onClick={() => onKeyClick('.')}
            extraClass="dot"
            icon={"."}
          />
        )}
        <SpecialKey
          key="space"
          type="space"
          icon={<SpacebarIcon />}
          onClick={onSpace}
          extraClass="space"
          text="Space"
        />
        {inputType === 'email' && (
          <SpecialKey
            key="at"
            type="at"
            icon={'@'}
            onClick={() => onKeyClick('@')}
            extraClass="at"
            text=""
          />
        )}
        <SpecialKey
          key="enter"
          type="enter"
          icon={<EnterIcon />}
          onClick={onEnter}
          extraClass="enter"
          text="Enter"
        />
      </KeyboardRow>
    </div>
  );
};

export default TextLayout;
