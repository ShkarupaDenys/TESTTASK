import {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  Loading,
  OnChange,
  OnSubmit,
  InputType,
  FormValues,
  UserFormProps,
} from 'types';

import {
  cutName,
  hasError,
  resizeFile,
  optimizePhone,
} from 'utils/helpers';

import {
  Input,
  Button,
  dataInputs,
  InputUpload,
  PositionsList,
} from 'views/components';

import {
  useToken,
  usePositions,
  useUser,
  useValidate,
} from 'hooks';
import { postUserToServer } from 'api';
import './UserForm.scss';

export const UserForm: FC<UserFormProps> = memo(({ addNewUser, setError }) => {
  const form = useRef(null);
  const { token, getToken } = useToken();
  const { loading, setLoading } = useUser();
  const { errorFields, isValidForm, setErrorFields } = useValidate();
  const { positions, getPositions } = usePositions();
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

  const handleOnChange = useCallback((value: string | number, name: string) => {
    setFormValues((oldData) => Object({ ...oldData, [name]: value }));
    setErrorFields((oldNames) => oldNames
      .filter((item) => cutName(item) !== name));
  }, []);

  const handleUpload = useCallback((e: OnChange) => {
    const { name, files } = e.target;

    if (!files) {
      return;
    }

    setFormValues((oldData) => Object({ ...oldData, [name]: files[0] }));
    setErrorFields((oldNames) => oldNames
      .filter((item) => cutName(item) !== name));
  }, []);

  const handleSubmit = async (e: OnSubmit) => {
    e.preventDefault();

    if (!isValidForm(formValues)) {
      return;
    }

    setLoading(Loading.Submit);

    const phone = optimizePhone(formValues.phone).slice(1);
    const formData = new FormData(form.current as unknown as HTMLFormElement);

    formData.append('phone', phone);

    const { photo } = formValues;

    try {
      const img = await resizeFile(photo) as File;

      formData.append('photo', img);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    try {
      const { user_id: userId } = await postUserToServer(formData, token);

      addNewUser(userId);
    } catch (errorMessage) {
      // eslint-disable-next-line no-console
      console.error(errorMessage);

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
      {dataInputs.map((input) => (
        <Input
          key={input.name}
          placeholder={input.placeholder}
          className={input.className}
          value={formValues[input.name]}
          isEmpty={hasError(errorFields, input.name)}
          name={input.name}
          type={input.type as InputType}
          helperText={input.helperText}
          onChange={handleOnChange}
        />
      ))}
      {!!positions.length && (
        <PositionsList
          positions={positions}
          currentPosition={formValues.position_id}
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
