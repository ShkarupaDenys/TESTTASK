import { FC } from 'react';
import { handleErrorMessage } from 'utils/helpers';
import { InputUploadProps } from 'types/InputUploadProps';
import classNames from 'classnames';
import './InputUpload.scss';

export const InputUpload: FC<InputUploadProps> = ({
  value,
  name = 'photo',
  isEmpty = '',
  className,
  placeholder = 'Upload your photo',
  onChange,
}) => {
  const errorMessage = handleErrorMessage(isEmpty, name);

  return (
    <div className={classNames(
      'InputUpload',
      { error: isEmpty },
      className,
    )}>
      <input
        id="photo"
        type="file"
        name={name}
        accept=".jpg, .jpeg"
        className="InputUpload__inner"
        onChange={onChange}
      />
      <label className="InputUpload__label" htmlFor="photo">
        Upload
      </label>
      {!value && (
        <span className="InputUpload__placeholder">
          {placeholder}
        </span>
      )}
      {isEmpty && <span className="Input__error">
        {errorMessage}
      </span>}
    </div>
  );
};
