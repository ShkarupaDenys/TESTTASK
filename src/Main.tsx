import { useEffect, useState } from 'react';
import {
  Header,
  Button,
  Section,
  UserForm,
  UsersList,
  HeroScreen,
  Notification,
} from 'views/components';
import { useUser } from 'hooks';
import 'Main.scss';

export const Main = () => {
  const [error, setError] = useState<string>('');
  const { nextUrl, loading, visibleUsers, addNewUser, getUsers } = useUser();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <Header />
      <HeroScreen />
      <Section
        className="Users"
        id="Users"
        title="Working with GET request"
      >
        <UsersList users={visibleUsers} />
        {nextUrl && (
          <Button
            size="md"
            content="Show more"
            className="Users__button"
            loading={loading}
            onClick={getUsers}
          />
        )}
      </Section>
      <Section
        className="NewUserForm"
        id="NewUserForm"
        title="Working with POST request"
      >
        <UserForm addNewUser={addNewUser} setError={setError} />
      </Section>
      {error && <Notification text={error} />}
    </>
  );
};

export default Main;
