import { useCallback, useState } from 'react';
import { getTokenFromServer } from 'api';

export const useToken = () => {
  const [token, setToken] = useState('');

  const getToken = useCallback(async () => {
    try {
      const { token: dataToken } = await getTokenFromServer();

      setToken(dataToken);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  return { token, getToken };
};
