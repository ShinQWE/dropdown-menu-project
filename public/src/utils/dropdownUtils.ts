import { DropdownPosition } from '../types/dropdown';

export const calculatePosition = (
  triggerRect: DOMRect,
  dropdownRect: { width: number; height: number },
  viewport: { width: number; height: number }
): DropdownPosition => {
  const { width: triggerWidth, height: triggerHeight } = triggerRect;
  const { width: dropdownWidth, height: dropdownHeight } = dropdownRect;
  const { width: viewportWidth, height: viewportHeight } = viewport;

  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  const spaceRight = viewportWidth - triggerRect.right;
  const spaceLeft = triggerRect.left;

  const canShowBelow = spaceBelow >= dropdownHeight;
  const canShowAbove = spaceAbove >= dropdownHeight;
  const canShowRight = spaceRight >= dropdownWidth;
  const canShowLeft = spaceLeft >= dropdownWidth;

  if (canShowBelow && canShowRight) return 'bottom-right';
  if (canShowBelow && canShowLeft) return 'bottom-left';
  if (canShowAbove && canShowRight) return 'top-right';
  if (canShowAbove && canShowLeft) return 'top-left';
  
  return 'bottom-right';
};

export const getPositionStyles = (
  position: DropdownPosition,
  triggerRect: DOMRect
): React.CSSProperties => {
  const styles: React.CSSProperties = {
    position: 'fixed',
    maxWidth: '260px',
    zIndex: 1000,
  };

  switch (position) {
    case 'bottom-right':
      styles.top = `${triggerRect.bottom + window.scrollY}px`;
      styles.left = `${triggerRect.left + window.scrollX}px`;
      break;
    case 'bottom-left':
      styles.top = `${triggerRect.bottom + window.scrollY}px`;
      styles.right = `${window.innerWidth - triggerRect.right - window.scrollX}px`;
      break;
    case 'top-right':
      styles.bottom = `${window.innerHeight - triggerRect.top - window.scrollY}px`;
      styles.left = `${triggerRect.left + window.scrollX}px`;
      break;
    case 'top-left':
      styles.bottom = `${window.innerHeight - triggerRect.top - window.scrollY}px`;
      styles.right = `${window.innerWidth - triggerRect.right - window.scrollX}px`;
      break;
  }

  return styles;
};