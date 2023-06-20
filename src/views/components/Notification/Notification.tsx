import { FC } from 'react';
import { createPortal } from 'react-dom';
import './Notification.scss';

interface Props {
  text: string;
}

export const Notification: FC<Props> = ({ text = 'text' }) => (
  createPortal(
    <div className="Notification">
      <div className="Notification__content">
        {text}
      </div>
    </div>,
    document.body
  )
);
