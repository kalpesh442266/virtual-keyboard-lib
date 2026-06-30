export const QWERTY_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
] as const;

export const SYMBOLS_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ['-', '_', '=', '+', '[', ']', '{', '}', '\\', '|'],
  [';', ':', '"', "'", ',', '.', '<', '>', '/', '?'],
] as const;

export const NUMBERS_LAYOUT = [
  ['7', '8', '9', '#'],
  ['4', '5', '6', '-'],
  ['1', '2', '3'],
  [',', '0', '.'],
] as const;

export const DEFAULT_THEME = {
  backgroundColor: '#1a1a1a',
  keyColor: '#444444',
  keyTextColor: '#ffffff',
  keyActiveColor: '#666666',
  keyHoverColor: '#555555',
  activeStateColor: '#4a90e2',
  keyBorderRadius: '0.5vw',
  keyFontSize: '32px',
  keyHeight: 'clamp(40px, 6.5vh, 60px)',
} as const;
