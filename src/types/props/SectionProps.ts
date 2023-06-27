import { ReactNode } from 'react';

export interface SectionProps {
  id?: string;
  title: string;
  className?: string;
  children: ReactNode;
}
