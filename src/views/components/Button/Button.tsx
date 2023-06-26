import { FC, useMemo } from 'react';
import { Preloader } from 'views/icons';
import classNames from 'classnames';
import './Button.scss';

interface Props {
  path?: string;
  disabled?: boolean;
  loading?: boolean;
  content: string;
  className?: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export const Button: FC<Props> = ({
  path,
  size = 'sm',
  type = 'button',
  loading,
  content,
  className,
  disabled = false,
  onClick,
}) => {
  const buttonClassNames = classNames('button', `button--${size}`, className);
  const buttonContent = useMemo(() => (
    loading ? <Preloader /> : content
  ), [content, loading]);

  return (
    <>
      {path ? (
        <a
          href={`#${path}`}
          className={buttonClassNames}
        >
          {buttonContent}
        </a>
      ) : (
        <button
          // eslint-disable-next-line react/button-has-type
          type={type}
          disabled={disabled}
          className={buttonClassNames}
          onClick={onClick}
        >
          {buttonContent}
        </button>
      )}
    </>
  );
};
