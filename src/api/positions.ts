import { ResponseGetPositions } from 'types';
import { client } from 'utils/fetchClient';

export function getPositionsFromServer(): Promise<ResponseGetPositions> {
  return client.get('/api/v1/positions');
}
