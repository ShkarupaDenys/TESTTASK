import { Errors } from 'types';

export const API = 'https://frontend-test-assignment-api.abz.agency';

type RequestMethod = 'GET' | 'POST';

function request(
  url: string,
  method: RequestMethod = 'GET',
  data: FormData = null,
  token = '',
) {
  const options: RequestInit = { method };

  if (data) {
    options.body = data;
    options.headers = {
      Token: token,
    };
  }

  return fetch(API + url, options)
    .then(response => {
      if (response.status === 409) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Error(Errors.status409).message;
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        throw new Error('Content type is not supported.');
      }

      if (response.status === 404) {
        throw new Error('Page not found');
      }

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      return response.json();
    });
}

export const client = {
  get: (url: string) => request(url),
  post: (url: string, formData: FormData, token: string) => {
    return request(url, 'POST', formData, token);
  },
};
