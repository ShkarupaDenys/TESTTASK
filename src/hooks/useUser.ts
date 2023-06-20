import { getUsersFromServer } from "api";
import { useCallback, useMemo, useState } from "react";
import { User } from "types/User";
import { API } from "utils/fetchClient";

export const useUser = () => {
  const [nextUrl, setNextUrl] = useState('/api/v1/users?page=1&count=6');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const visibleUsers = useMemo(() => [...users], [users]);

  const getUsers = useCallback(async () => {
    setLoading(true);

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
      setLoading(false);
    }
  }, [nextUrl, visibleUsers.length]);

  const addNewUser = useCallback(async () => {
    setLoading(true);

    const count = nextUrl ? visibleUsers.length : visibleUsers.length + 1;

    try {
      const { users } = await getUsersFromServer(
        `/api/v1/users?page=1&count=${count}`
      );

      setUsers(users);
    } catch {
      console.error('error');
    } finally {
      setLoading(false);
    }
  }, [nextUrl, visibleUsers]);

  return { nextUrl, loading, visibleUsers, getUsers, addNewUser };
}