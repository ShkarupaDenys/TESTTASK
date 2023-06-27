import { FC } from 'react';
import { PositionsListProps } from 'types';
import { Checkbox } from 'views/components';

export const PositionsList: FC<PositionsListProps> = ({
  positions,
  currentPosition,
  handleOnChange,
}) => (
  <>
    <p className="UserForm__positions-heading p1">
      Select your position
    </p>
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
