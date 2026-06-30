import { forwardRef, type CSSProperties, type ReactNode, type MouseEvent } from 'react';

interface VirtualKeyboardContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const VirtualKeyboardContainer = forwardRef<HTMLDivElement, VirtualKeyboardContainerProps>(
  ({ children, className = '', style }, ref) => {
    const handleMouseDown = (e: MouseEvent) => {
      // Prevent the input from losing focus when clicking on keyboard
      e.preventDefault();
    };

    const handleClick = (e: MouseEvent) => {
      // Prevent any default click behavior
      e.preventDefault();
      e.stopPropagation();
    };

    const containerClasses = ['vk-container', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={style}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        data-testid="keyboard-container"
      >
        {children}
      </div>
    );
  }
);

VirtualKeyboardContainer.displayName = 'VirtualKeyboardContainer';

export default VirtualKeyboardContainer;
