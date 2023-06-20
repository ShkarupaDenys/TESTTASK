import { ChangeEvent } from "react";

export interface InputUploadProps {
  name?: string;
  value?: boolean;
  placeholder?: string;
  isEmpty?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}