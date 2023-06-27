import { FC } from 'react';
import { User, UsersListProps } from 'types';
import { UserCard } from 'views/components';
import './UsersList.scss';

export const UsersList: FC<UsersListProps> = ({ users }) => (
  <div className="UsersList">
    {users.map((user: User) => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);
