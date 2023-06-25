import { ResponseGetUsers, ResponsePostUser } from 'types';
import { client } from 'utils/fetchClient';

export function postUserToServer(
  formData: FormData,
  token: string,
): Promise<ResponsePostUser> {
  return client.post('/api/v1/users', formData, token);
}

export function getUsersFromServer(url: string): Promise<ResponseGetUsers> {
  return client.get(url);
}
