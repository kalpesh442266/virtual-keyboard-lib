/**
 * Utility functions to handle layout shifting when virtual keyboard appears
 */

const KEYBOARD_HEIGHT_VH = 38;
const INPUT_PADDING = 20;
const TRANSITION_CLASS = 'vk-keyboard-shift-transition';
const TRANSITION_DURATION = 300;

let shiftedElements: HTMLElement[] = [];
let styleInjected = false;

function injectStyles(): void {
  if (styleInjected) return;

  const style = document.createElement('style');
  style.id = 'vk-keyboard-shift-styles';
  style.textContent = `
    .${TRANSITION_CLASS} {
      transition: transform ${TRANSITION_DURATION}ms ease-out;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);
  styleInjected = true;
}

function findContentElements(keyboardContainerRef: HTMLSpanElement | null): HTMLElement[] {
  if (!keyboardContainerRef) return [];
  return Array.from(keyboardContainerRef.parentElement?.children ?? []).filter(
    (child): child is HTMLElement => {
      if (child === keyboardContainerRef) return false;
      const { position } = window.getComputedStyle(child);
      return position !== 'fixed' && position !== 'absolute';
    }
  );
}

function calculateShiftAmount(input: HTMLElement): number {
  const inputBottom = input.getBoundingClientRect().bottom;
  const visibleHeight = window.innerHeight * (1 - KEYBOARD_HEIGHT_VH / 100);
  const overflow = inputBottom + INPUT_PADDING - visibleHeight;

  return overflow > 0 ? overflow : 0;
}

/**
 * Scroll the input into view by shifting content elements up
 */
export function scrollInputIntoView(input: HTMLInputElement | HTMLTextAreaElement, keyboardContainerRef: HTMLSpanElement): void {
  if (shiftedElements.length > 0) resetScrollPosition();

  const shiftAmount = calculateShiftAmount(input);
  if (shiftAmount === 0) return;

  const contentElements = findContentElements(keyboardContainerRef);

  if (contentElements.length === 0) return;

  injectStyles();
  shiftedElements = contentElements;

  for (const element of contentElements) {
    element.classList.add(TRANSITION_CLASS);
    element.style.transform = `translateY(-${shiftAmount}px)`;
  }
}

/**
 * Reset scroll position by removing transforms from shifted elements
 */
export function resetScrollPosition(): void {
  if (shiftedElements.length === 0) return;

  for (const element of shiftedElements) {
    if (document.body.contains(element)) {
      element.style.transform = 'translateY(0)';
    }
  }

  const elementsToCleanup = [...shiftedElements];
  setTimeout(() => {
    for (const element of elementsToCleanup) {
      if (document.body.contains(element)) {
        element.classList.remove(TRANSITION_CLASS);
      }
    }
  }, TRANSITION_DURATION);

  shiftedElements = [];
}

