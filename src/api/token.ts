import { client } from 'utils/fetchClient';

export const getTokenFromServer = () => client.get('/api/v1/token');
