import type { FC } from 'react';
import type { TextLayoutProps } from '../types';
import { BackspaceIcon, EnterIcon, SpacebarIcon, CapsLockIcon } from './icons';
import { SpecialKey } from './SpecialKey';
import { VirtualKey } from './VirtualKey';
import { KeyboardRow } from './KeyboardRow';
import { keyListMatches } from '../utils/keyboard-helpers';

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
  keyLabels,
  hiddenKeys,
  disabledKeys,
  renderKey,
  renderSpecialKey,
  continuousPressConfig,
}) => {
  // Resolve a custom label for a special key, checking each alias in order
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

  const renderSpecialKeysLeft = (rowIndex: number) => {
    switch (rowIndex) {
      case 3:
        return (
          currentLayout === 'letters' &&
          !isHidden('caps', 'capslock') && (
            <SpecialKey
              key="caps"
              type="caps"
              icon={<CapsLockIcon />}
              onClick={onCapsToggle}
              extraClass="capsLock"
              text={labelFor('Caps Lock', 'caps', 'capslock')}
              capsLock={capsLock}
              disabled={isDisabled('caps', 'capslock')}
              renderSpecialKey={renderSpecialKey}
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
          !isHidden('backspace') && (
            <SpecialKey
              key="backspace"
              type="backspace"
              icon={<BackspaceIcon />}
              onClick={onBackspace}
              extraClass="backspace"
              text={labelFor('Backspace', 'backspace')}
              enableContinuousPress={true}
              continuousPressConfig={continuousPressConfig}
              disabled={isDisabled('backspace')}
              renderSpecialKey={renderSpecialKey}
            />
          )
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
            if (isHidden(key, displayKey)) return null;
            return (
              <VirtualKey
                key={`${rowIndex}-${keyIndex}-${key}`}
                keyValue={displayKey}
                onClick={onKeyClick}
                disabled={isDisabled(key, displayKey)}
                renderKey={renderKey}
              />
            );
          })}
          {renderSpecialKeysRight(rowIndex)}
        </KeyboardRow>
      ))}

      <KeyboardRow>
        {!isHidden('layout') && (
          <SpecialKey
            key="layout"
            type="layout"
            icon={currentLayout === 'letters' ? '&123' : 'ABC'}
            onClick={onLayoutToggle}
            extraClass="layout"
            text=""
            disabled={isDisabled('layout')}
            renderSpecialKey={renderSpecialKey}
          />
        )}
        {inputType === 'email' && !isHidden('dot', '.') && (
          <SpecialKey
            key="dot"
            type="dot"
            onClick={() => onKeyClick('.')}
            extraClass="dot"
            icon={'.'}
            disabled={isDisabled('dot', '.')}
            renderSpecialKey={renderSpecialKey}
          />
        )}
        {!isHidden('space') && (
          <SpecialKey
            key="space"
            type="space"
            icon={<SpacebarIcon />}
            onClick={onSpace}
            extraClass="space"
            text={labelFor('Space', 'space')}
            disabled={isDisabled('space')}
            renderSpecialKey={renderSpecialKey}
          />
        )}
        {inputType === 'email' && !isHidden('at', '@') && (
          <SpecialKey
            key="at"
            type="at"
            icon={'@'}
            onClick={() => onKeyClick('@')}
            extraClass="at"
            text=""
            disabled={isDisabled('at', '@')}
            renderSpecialKey={renderSpecialKey}
          />
        )}
        {!isHidden('enter') && (
          <SpecialKey
            key="enter"
            type="enter"
            icon={<EnterIcon />}
            onClick={onEnter}
            extraClass="enter"
            text={labelFor('Enter', 'enter')}
            disabled={isDisabled('enter')}
            renderSpecialKey={renderSpecialKey}
          />
        )}
      </KeyboardRow>
    </div>
  );
};

export default TextLayout;
