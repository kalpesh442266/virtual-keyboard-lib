import type { FC } from 'react';
import type { KeyboardLayoutProps } from '../types';
import { NUMBERS_LAYOUT, QWERTY_LAYOUT, SYMBOLS_LAYOUT } from '../constants';
import { NumbersLayout } from './NumbersLayout';
import { TextLayout } from './TextLayout';

export const KeyboardLayout: FC<KeyboardLayoutProps> = ({
  currentLayout,
  capsLock,
  onKeyClick,
  onBackspace,
  onEnter,
  onSpace,
  onCapsToggle,
  onLayoutToggle,
  inputType,
}) => {
  const currentLayoutData =
    currentLayout === 'letters'
      ? QWERTY_LAYOUT
      : currentLayout === 'symbols'
        ? SYMBOLS_LAYOUT
        : NUMBERS_LAYOUT;

  // Numbers layout has a different structure (4x5 grid)
  if (currentLayout === 'numbers') {
    return (
      <NumbersLayout
        currentLayoutData={currentLayoutData}
        onBackspace={onBackspace}
        onEnter={onEnter}
        onKeyClick={onKeyClick}
        capsLock={capsLock}
        currentLayout={currentLayout}
      />
    );
  }

  return (
    <TextLayout
      inputType={inputType}
      currentLayoutData={currentLayoutData}
      onBackspace={onBackspace}
      onEnter={onEnter}
      onSpace={onSpace}
      onCapsToggle={onCapsToggle}
      onLayoutToggle={onLayoutToggle}
      onKeyClick={onKeyClick}
      capsLock={capsLock}
      currentLayout={currentLayout}
    />
  );
};

export default KeyboardLayout;
