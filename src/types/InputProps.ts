import { InputType } from './InputType';

export interface InputProps {
  type?: InputType;
  name: string;
  value: string;
  placeholder?: string;
  helperText?: string;
  isEmpty?: string;
  className?: string;
  onChange: (value: string, name: string) => void;
}
