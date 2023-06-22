import { getUsersFromServer } from "api";
import { useCallback, useMemo, useState } from "react";
import { Loading, User } from "types";
import { API } from "utils/fetchClient";

export const useUser = () => {
  const [nextUrl, setNextUrl] = useState('/api/v1/users?page=1&count=6');
  const [loading, setLoading] = useState<Loading>(Loading.None);
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState(0);

  const visibleUsers = useMemo(() => [...users], [users]);

  const getUsers = useCallback(async () => {
    setLoading(Loading.ShowMore);

    try {
      const { links, users } = await getUsersFromServer(nextUrl);

      const path = links.next_url;

      if (!visibleUsers.length) {
        setUsers(users);
        setNextUrl(path.replace(API, ''));

        return;
      }

      setNextUrl(path ? path.replace(API, '') : null);
      setUsers((oldData) => [...oldData, ...users]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(Loading.None);
    }
  }, [nextUrl, visibleUsers.length]);

  const addNewUser = useCallback(async (userId: number) => {
    setLoading(Loading.ShowMore);
    setNewUser(userId)

    const count = nextUrl ? visibleUsers.length : visibleUsers.length + 1;

    try {
      const { users } = await getUsersFromServer(
        `/api/v1/users?page=1&count=${count}`
      );

      setUsers(users);
    } catch (error) {
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
}