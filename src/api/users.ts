import { client } from "utils/fetchClient";

export const postUserToServer = (formData: FormData, token: string) => {
  return client.post('/api/v1/users', formData, token);
};

export const getUsersFromServer = (url: string) => {
  return client.get(url);
};