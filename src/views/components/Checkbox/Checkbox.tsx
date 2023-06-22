import { CheckboxProps } from 'types';
import './Checkbox.scss';

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  disabled,
  checked,
  name = 'position_id',
  onChange,
}) => (
  <label className='Checkbox'>
    <input
      id={id}
      name={name}
      type="radio"
      value={id}
      className="Checkbox__real"
      disabled={disabled}
      checked={checked}
      onChange={() => onChange(id, name)}
    />
    <div className="Checkbox__custom" />
      {label}
  </label>
)
