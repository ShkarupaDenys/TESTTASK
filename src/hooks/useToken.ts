import { useState } from "react";
import { getTokenFromServer } from "api";

export const useToken = () => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const { token } = await getTokenFromServer();

      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  return { token, getToken };
}
