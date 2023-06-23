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

export const Button: React.FC<Props> = ({
  path,
  size = 'sm',
  type = 'button',
  loading,
  content,
  className,
  disabled = false,
  onClick,
}) => (
  <>
    {path ? (
      <a
        href={`#${path}`}
        className={classNames(
          'button',
          `button--${size}`,
          className,
        )}
      >
        {!loading ? content : <Preloader />}
      </a>
    ) : (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={disabled}
        className={classNames(
          'button',
          `button--${size}`,
          className,
        )}
        onClick={onClick}
      >
        {!loading ? content : <Preloader />}
      </button>
    )}
  </>
);
