import { TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { isEmailValid } from '../../shared/validations/isEmailValid';

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { email: '', password: '', role: '' },
    validate: {
      email: (email) => {
        if (email.includes(' ')) {
          return 'Email не может содержать пробелы';
        }
        if (!isEmailValid(email)) {
          return 'Неверный email';
        }
        return null;
      },
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        id="input-email"
        mt="sm"
        label={translate('users.fields.email')}
        {...getInputProps('email')}
      />
      <TextInput
        id="input-password"
        mt="sm"
        label={translate('users.fields.password')}
        {...getInputProps('password')}
      />
      <TextInput
        id="input-role"
        mt="sm"
        label={translate('users.fields.role')}
        {...getInputProps('role')}
      />
    </Create>
  );
};
