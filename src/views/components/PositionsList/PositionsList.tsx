import { Position } from "types";
import { Checkbox } from "views/components";

interface Props {
  positions: Position[];
  currrentPosition: number;
  handleOnChange: (value: string, name: string) => void;
}

export const PositionsList: React.FC<Props> = ({
  positions,
  currrentPosition,
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
            id={id}
            label={name}
            checked={currrentPosition === Number(id)}
            onChange={handleOnChange}
          />
        ))}
    </div>
  </>
);
