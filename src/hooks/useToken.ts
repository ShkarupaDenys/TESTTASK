import { useState } from 'react';
import { getTokenFromServer } from 'api';

export const useToken = () => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const { data } = await getTokenFromServer();

      setToken(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return { token, getToken };
};
