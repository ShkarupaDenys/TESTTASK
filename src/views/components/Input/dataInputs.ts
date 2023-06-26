import { DataInput } from 'types';

export const dataInputs: DataInput[] = [
  {
    name: 'name',
    placeholder: 'Your name',
    className: 'UserForm__input',
  },
  {
    name: 'email',
    placeholder: 'Your email',
    className: 'UserForm__input',
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    className: 'UserForm__input UserForm__input--phone',
    type: 'tel',
    helperText: '+38 (XXX) XXX - XX - XX',
  },
];
