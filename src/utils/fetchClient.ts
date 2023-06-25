// import { Errors } from 'types';

// import { error } from "console";

export const API = 'https://frontend-test-assignment-api.abz.agency';

type RequestMethod = 'GET' | 'POST';

// function request(
//   url: string,
//   method: RequestMethod = 'GET',
//   data: FormData = null,
//   token = '',
// ) {
//   const options: RequestInit = { method };

//   if (data) {
//     options.body = data;
//     options.headers = {
//       Token: token,
//     };
//   }

//   return fetch(API + url, options)
//     .then(response => {
//       if (response.status === 409) {
//         // eslint-disable-next-line @typescript-eslint/no-throw-literal
//         throw new Error(Errors.status409).message;
//       }

//       if (!response.headers.get('content-type').includes('application/json')) {
//         throw new Error('Content type is not supported.');
//       }

//       if (response.status === 404) {
//         throw new Error('Page not found');
//       }

//       if (!response.ok) {
//         throw new Error('Something went wrong.');
//       }

//       return response.json();
//     });
// }

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

  // if (!response.ok) {
  //   // throw new Error('Error in the API');
  //   // eslint-disable-next-line prefer-promise-reject-errors
  //   throw new Error(`Error! status: ${response.status}`);
  // }

  if (response.status === 404) {
    throw new Error('Content type is not supported');
  }

  const responseData = await response.json();

  return responseData;
}

export const client = {
  get: <T> (url: string) => request<T>(url),
  post: <T>(url: string, formData: FormData, token: string) => {
    return request<T>(url, 'POST', formData, token);
  },
};
