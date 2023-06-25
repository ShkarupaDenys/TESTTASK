import { Position } from 'types';
import { Checkbox } from 'views/components';

interface Props {
  positions: Position[];
  currentPosition: number;
  handleOnChange: (value: string, name: string) => void;
}

export const PositionsList: React.FC<Props> = ({
  positions,
  currentPosition,
  handleOnChange,
}) => (
  <>
    <p className="UserForm__positions-heading p1">Select your position</p>
    <div className="UserForm__positions-list">
      {positions.map(({ id, name }) => (
        <Checkbox
          key={id}
          id={id.toString()}
          label={name}
          checked={Number(currentPosition) === id}
          onChange={handleOnChange}
        />
      ))}
    </div>
  </>
);
