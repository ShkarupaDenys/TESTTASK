export interface ButtonProps {
  path?: string;
  disabled?: boolean;
  loading?: boolean;
  content: string;
  className?: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  onClick?: () => void;
}
