import { User } from "types/User";
import { UserCard } from "views/components";
import './UsersList.scss';

interface Props {
  users: User[];
}

export const UsersList: React.FC<Props> = ({ users }) => (
  <div className="UsersList">
    {users.map((user: User) => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);
