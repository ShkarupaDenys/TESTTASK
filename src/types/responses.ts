import { Position } from './Position';
import { User } from './User';

export type ResponseGetToken = {
  success: boolean,
  token: string,
};

export type ResponseGetPositions = {
  success: boolean,
  positions: Position[];
};

export type ResponseGetUsers = {
  success: boolean,
  page: number,
  total_pages: number,
  total_users: number,
  count: number,
  links: {
    next_url: string | null,
    prev_url: string | null,
  },
  users: User[],
};

export type ResponsePostUser = {
  success: boolean,
  user_id?: number,
  message: string,
  fails: {},
};
