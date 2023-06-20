import { client } from "utils/fetchClient";

export const getPositionsFromServer = () => {
  return client.get('/api/v1/positions');
};