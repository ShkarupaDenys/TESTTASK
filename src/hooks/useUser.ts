import { getUsersFromServer } from 'api';
import { useCallback, useMemo, useState } from 'react';
import { Loading, User } from 'types';
import { API } from 'utils/fetchClient';

export const useUser = () => {
  const [nextUrl, setNextUrl] = useState('/api/v1/users?page=1&count=6');
  const [loading, setLoading] = useState<Loading>(Loading.None);
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState(0);

  const visibleUsers = useMemo(() => [...users], [users]);

  const getUsers = useCallback(async () => {
    setLoading(Loading.ShowMore);

    try {
      const { links, users: dataUsers } = await getUsersFromServer(nextUrl);

      const path = links.next_url;
      const endpoint = path.replace(API, '');

      if (!visibleUsers.length) {
        setUsers(dataUsers);
        setNextUrl(endpoint);

        return;
      }

      setNextUrl(path ? endpoint : null);
      setUsers((prevUsers) => [...prevUsers, ...dataUsers]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(Loading.None);
    }
  }, [nextUrl, visibleUsers.length]);

  const addNewUser = useCallback(async (userId: number) => {
    setLoading(Loading.ShowMore);
    setNewUser(userId);

    const count = nextUrl ? visibleUsers.length : visibleUsers.length + 1;

    try {
      const { users: dataUsers } = await getUsersFromServer(
        `/api/v1/users?page=1&count=${count}`,
      );

      setUsers(dataUsers);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(Loading.None);
    }
  }, [nextUrl, visibleUsers]);

  return {
    newUser,
    nextUrl,
    loading,
    visibleUsers,
    getUsers,
    addNewUser,
    setLoading,
  };
};
