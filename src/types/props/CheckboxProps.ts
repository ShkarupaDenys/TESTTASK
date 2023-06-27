export interface CheckboxProps {
  id: string;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  name?: string;
  onChange: (value: string, name: string) => void;
}
