import { Position } from '../Position';

export interface PositionsListProps {
  positions: Position[];
  currentPosition: number;
  handleOnChange: (value: string, name: string) => void;
}
