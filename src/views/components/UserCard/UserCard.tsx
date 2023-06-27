import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PhotoCover } from 'views/icons';
import { API } from 'utils/fetchClient';
import { UserCardProps } from 'types';
import './UserCard.scss';

export const UserCard: FC<UserCardProps> = ({ user }) => {
  const {
    name,
    email,
    photo,
    position,
    phone: phoneData,
  } = user;
  const phone = phoneData.startsWith('+') ? phoneData : `+${phoneData}`;

  return (
    <div className="UserCard text-center">
      {photo === `${API}/images/placeholders/placeholder.png`
        ? <PhotoCover className="UserCard__img" />
        : (
          <img src={photo} alt={name} className="UserCard__img" />
        )}
      <p className="UserCard__name p1" data-title={name}>
        <span className="truncate">{name}</span>
      </p>
      <p className="p1">{position}</p>
      <Link
        to={`mailto:${email}`}
        className="UserCard__email p1"
        data-title={email}
      >
        <span className="truncate">{email}</span>
      </Link>
      <Link to={`tel:${phone}`} className="UserCard__phone p1">
        {phone}
      </Link>
    </div>
  );
};
