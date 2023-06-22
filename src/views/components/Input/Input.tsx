import { FC, useState } from 'react';
import { PhoneInput } from '@ua-opendata/react-phone-input';
import { handleErrorMessage } from 'utils/helpers';
import { InputProps } from 'types';
import classNames from 'classnames';
import './Input.scss';

export const Input: FC<InputProps> = ({
  type = 'text',
  name,
  value,
  isEmpty = '',
  helperText,
  className,
  placeholder,
  onChange,
}) => {
  const [hasPlaceholder, setHasplaceholder] = useState(true);
  const errorMessage = handleErrorMessage(isEmpty, name);

  const handleOnBlur = () => {
    if (!value || value === '+38 (0') {
      return;
    }

    setHasplaceholder(false);
  };

  return (
    <div className={classNames(
      'Input',
      { error: isEmpty },
      className,
    )}>
      {type === 'tel' ? (
        <PhoneInput
          className="Input__inner"
          name={name}
          value={value}
          aria-label={name}
          onBlur={handleOnBlur}
          onFocus={() => setHasplaceholder(true)}
          onChange={(e) => onChange(e.target.value, name)}
        />
      ) : (
        <input
          aria-label={name}
          type={type}
          name={name}
          className="Input__inner"
          value={value}
          onBlur={handleOnBlur}
          onFocus={() => setHasplaceholder(true)}
          onChange={(e) => onChange(e.target.value, name)}
        />
      )}
      {hasPlaceholder && (
        <span className="Input__placeholder">{placeholder}</span>
      )}
      {helperText && !isEmpty && (
        <span className="Input__helper-text">{helperText}</span>
      )}
      {isEmpty && <span className="Input__error">{errorMessage}</span>}
    </div>
  );
};
