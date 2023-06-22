import {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  Input,
  Button,
  InputUpload,
  PositionsList,
} from 'views/components';

import {
  cutName,
  isEmail,
  hasError,
  resizeFile,
  optimizePnone,
} from 'utils/helpers';
import { postUserToServer } from 'api';
import { useToken, usePositions, useUser } from 'hooks';
import { FormValues, Loading, OnChange, OnSubmit } from 'types';
import './UserForm.scss';

interface Props {
  addNewUser: (userId: number) => void;
  setError: (error: string) => void;
}

export const UserForm: FC<Props> = memo(({ addNewUser, setError }) => {
  const form = useRef(null);
  const { token, getToken } = useToken();
  const { loading, setLoading } = useUser();
  const { positions, getPositions } = usePositions();
  const [errorFields, seterrorFields] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    photo: null,
    position_id: 1,
  });

  useEffect(() => {
    getPositions();
    getToken();
  }, []);

  const handleErrorFields = useCallback(
    (values: Omit<FormValues, 'position_id'>) => {
      Object.entries(values).forEach((field) => {
        if (!field[1] && !errorFields.includes(field[0])) {
          const hasError = errorFields.includes(`${field[0]}-empty`);

          if (hasError) {
            return;
          }

          seterrorFields((oldNames) => [...oldNames, `${field[0]}-empty`]);
        }
      });

      const fieldValues = Object.values(values);

      return !fieldValues.some((field) => !field);
    },
    [errorFields]
  );

  const handleValidateForm = (values: Omit<FormValues, 'position_id'>) => {
    const { name, email, phone, photo } = values;

    const isValidEmail = isEmail(email);
    const isValidName = name.length >= 2 && name.length <= 60;
    const isValidPhone = optimizePnone(phone).length === 13;

    if (!isValidEmail && email) {
      const hasError = errorFields.includes('email-invalid');

      if (!hasError) {
        seterrorFields((old) => [...old, 'email-invalid']);
      }
    }

    if (!isValidName && name) {
      const hasError = errorFields.includes('name-invalid');

      if (!hasError) {
        seterrorFields((old) => [...old, 'name-invalid']);
      }
    }

    if (!isValidPhone && phone) {
      const hasError = errorFields.includes('phone-invalid');

      if (!hasError) {
        seterrorFields((old) => [...old, 'phone-invalid']);
      }
    }

    if (photo) {
      const fileSize = Math.round(photo.size / 1024);
      const isValidPhoto = fileSize < 5120;
      const hasError = errorFields.includes('photo-invalid');

      if (!isValidPhoto && photo && !hasError) {
        seterrorFields((old) => [...old, 'photo-invalid']);
      }
    }

    return isValidEmail && isValidName && isValidPhone;
  };

  const isValidForm = (form: FormValues) => {
    const { name, photo, email, phone } = form;

    const fields = { name: name.trim(), photo, email, phone };

    const isAllFieldaFilled = handleErrorFields(fields);
    const isValidForm = handleValidateForm(fields);

    return isAllFieldaFilled && isValidForm;
  };

  const handleOnChange = useCallback((value: string, name: string) => {
    setFormValues((oldData) => Object({ ...oldData, [name]: value }));
    seterrorFields((oldNames) =>
      oldNames.filter((item) => cutName(item) !== name)
    );
  }, []);

  const handleUpload = useCallback((e: OnChange) => {
    const { name, files } = e.target;

    if (!files) {
      return;
    }

    setFormValues((oldData) => Object({ ...oldData, [name]: files[0] }));
    seterrorFields((oldNames) =>
      oldNames.filter((item) => cutName(item) !== name)
    );
  }, []);

  const handleSubmit = async (e: OnSubmit) => {
    e.preventDefault();

    const isValid = isValidForm(formValues);

    if (!isValid) {
      return;
    }

    setLoading(Loading.Submit);

    const phone = optimizePnone(formValues.phone).slice(1);
    const formData = new FormData(form.current as unknown as HTMLFormElement);
    formData.append('phone', phone);

    const photo = formValues.photo;

    if (!photo) {
      return;
    }

    try {
      const result: unknown = await resizeFile(photo);
      const img: File = result as File;

      formData.append('photo', img);
    } catch (error) {
      console.error(error)
    }

    try {
      const { user_id } = await postUserToServer(formData, token);

      addNewUser(user_id);
    } catch (errorMessage) {
      if (typeof errorMessage === 'string') {
        setError(errorMessage);
      }
    } finally {
      setLoading(Loading.None);
    }
  };

  return (
    <form
      ref={form}
      className="UserForm__form container-sm"
      onSubmit={handleSubmit}
    >
      <Input
        className="UserForm__input"
        placeholder="Your name"
        value={formValues.name}
        isEmpty={hasError(errorFields, 'name')}
        name="name"
        onChange={handleOnChange}
      />
      <Input
        placeholder="Email"
        className="UserForm__input"
        isEmpty={hasError(errorFields, 'email')}
        value={formValues.email}
        name="email"
        onChange={handleOnChange}
      />
      <Input
        placeholder="Phone"
        className="UserForm__input UserForm__input--phone"
        value={formValues.phone}
        isEmpty={hasError(errorFields, 'phone')}
        name="phone"
        type="tel"
        helperText="+38 (XXX) XXX - XX - XX"
        onChange={handleOnChange}
      />
      {!!positions.length && (
        <PositionsList
          positions={positions}
          currrentPosition={formValues.position_id}
          handleOnChange={handleOnChange}
        />
      )}
      <InputUpload
        name="photo"
        onChange={handleUpload}
        className="UserForm__input-upload"
        isEmpty={hasError(errorFields, 'photo')}
        value={!!formValues.photo}
      />
      <Button
        type="submit"
        content="Sign up"
        className="UserForm__button"
        loading={loading === Loading.Submit}
      />
    </form>
  );
});
