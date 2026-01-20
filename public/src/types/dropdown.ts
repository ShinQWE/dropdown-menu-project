export type DropdownPosition = 
  | 'bottom-right' 
  | 'top-right' 
  | 'bottom-left' 
  | 'top-left';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger: React.ReactNode;
  className?: string;
}