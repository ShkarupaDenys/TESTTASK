import { ResponseGetToken } from 'types';
import { client } from 'utils/fetchClient';

export function getTokenFromServer(): Promise<ResponseGetToken> {
  return client.get('/api/v1/token');
}
