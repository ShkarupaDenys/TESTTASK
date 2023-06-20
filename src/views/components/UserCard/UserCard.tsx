import { PhotoCover } from 'views/icons/PhotoCover';
import { API } from 'utils/fetchClient';
import { User } from 'types/User';
import './UserCard.scss';

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const { photo, name, position, email, phone: phoneData } = user;
  const phone = phoneData.includes('+') ? phoneData : `+${phoneData}`
  
  return (
    <div className="UserCard text-center">
      {photo === `${API}/images/placeholders/placeholder.png`
      ? <PhotoCover className="UserCard__img" />
      : <img
          src={photo}
          alt={name}
          className="UserCard__img"
        />}
      <p className="UserCard__name p1" data-title={name}>
        <span className='truncate'>{name}</span>
      </p>
      <p className="p1">{position}</p>
      <a
        href={`mailto:${email}`}
        className="UserCard__email p1"
        data-title={email}
      >
        <span className='truncate'>{email}</span>
      </a>
      <a href={`tel:${phone}`} className="UserCard__phone p1">
      {phone.includes('+') ? phone : `+${phone}`}
      </a>
    </div>
  )
};
