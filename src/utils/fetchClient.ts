// import { Errors } from 'types';

export const API = 'https://frontend-test-assignment-api.abz.agency';

type RequestMethod = 'GET' | 'POST';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: FormData = null,
  token = '',
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = data;
    options.headers = {
      Token: token,
    };
  }

  const response = await fetch(API + url, options);

  if (response.status === 404) {
    throw new Error('Page not found');
  }

  const responseData = await response.json();
  const { success, message } = responseData;

  if (!success) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Error(message).message;
  }

  return responseData;
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, formData: FormData, token: string) => {
    return request<T>(url, 'POST', formData, token);
  },
};
