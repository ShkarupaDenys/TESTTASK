import { useCallback, useState } from 'react';
import { FormValues } from 'types';
import { isEmail, optimizePhone } from 'utils/helpers';

export const useValidate = () => {
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const handleErrorFields = useCallback(
    (values: Omit<FormValues, 'position_id'>) => {
      Object.entries(values).forEach((field) => {
        if (!field[1] && !errorFields.includes(field[0])) {
          const isError = errorFields.includes(`${field[0]}-empty`);

          if (isError) {
            return;
          }

          setErrorFields((oldNames) => [...oldNames, `${field[0]}-empty`]);
        }
      });

      const fieldValues = Object.values(values);

      return !fieldValues.some((field) => !field);
    },
    [errorFields],
  );

  const handleValidateForm = (values: Omit<FormValues, 'position_id'>) => {
    const {
      name,
      email,
      phone,
      photo,
    } = values;

    const isValidEmail = isEmail(email);
    const isValidName = name.length >= 2 && name.length <= 60;
    const isValidPhone = optimizePhone(phone).length === 13;

    if (!isValidEmail && email) {
      const isError = errorFields.includes('email-invalid');

      if (!isError) {
        setErrorFields((old) => [...old, 'email-invalid']);
      }
    }

    if (!isValidName && name) {
      const isError = errorFields.includes('name-invalid');

      if (!isError) {
        setErrorFields((old) => [...old, 'name-invalid']);
      }
    }

    if (!isValidPhone && phone) {
      const isError = errorFields.includes('phone-invalid');

      if (!isError) {
        setErrorFields((old) => [...old, 'phone-invalid']);
      }
    }

    if (photo) {
      const fileSize = Math.round(photo.size / 1024);
      const isValidPhoto = fileSize < 5120;
      const isError = errorFields.includes('photo-invalid');

      if (!isValidPhoto && photo && !isError) {
        setErrorFields((old) => [...old, 'photo-invalid']);
      }
    }

    return isValidEmail && isValidName && isValidPhone;
  };

  const isValidForm = (values: FormValues) => {
    const {
      name,
      photo,
      email,
      phone,
    } = values;

    const fields = {
      name: name.trim(),
      photo,
      email,
      phone,
    };

    const isAllFields = handleErrorFields(fields);
    const isValid = handleValidateForm(fields);

    return isAllFields && isValid;
  };

  return { errorFields, isValidForm, setErrorFields };
};
