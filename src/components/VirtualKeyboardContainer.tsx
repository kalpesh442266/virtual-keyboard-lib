import type { FC, ReactNode, MouseEvent } from 'react';

interface VirtualKeyboardContainerProps {
  children: ReactNode;
  className?: string;
}

export const VirtualKeyboardContainer: FC<VirtualKeyboardContainerProps> = ({
  children,
  className = '',
}) => {
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
      className={containerClasses}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      data-testid="keyboard-container"
    >
      {children}
    </div>
  );
};

export default VirtualKeyboardContainer;
