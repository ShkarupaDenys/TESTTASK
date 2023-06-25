import Resizer from 'react-image-file-resizer';

export const isEmail = (email: string) => {
  // eslint-disable-next-line max-len, no-control-regex
  return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
    email,
  );
};

export const resizeFile = (file: File) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    75,
    75,
    'JPEG',
    100,
    0,
    resolve,
    'file',
    75,
    75,
  );
});

export const optimizePhone = (phone: string) => {
  return phone
    .replaceAll(' ', '')
    .replaceAll('-', '')
    .replaceAll('(', '')
    .replaceAll(')', '');
};

export const cutName = (name: string) => name.split('-')[0];

export const hasError = (fields: string[], name: string) => {
  return fields.find(
    item => (item === `${name}-empty`) || (item === `${name}-invalid`),
  );
};

export const handleErrorMessage = (errorName: string, name: string) => {
  const type = errorName?.split('-')[1];

  switch (type) {
    case 'empty':
      return `The ${name} field is required`;

    case 'invalid':
      switch (name) {
        case 'name':
          return `The ${name} should be 2-60 characters`;

        case 'email':
          return `The ${name} is not valid`;

        case 'photo':
          return `The ${name} size must not exceed 5MB`;

        case 'phone':
          return `The ${name} should be +38 (XXX) XXX - XX - XX`;

        default:
          return '';
      }

    default:
      return '';
  }
};
