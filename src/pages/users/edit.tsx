import { TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/mantine';

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: { id: '', email: '', password: '', role: '' },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label={translate('users.fields.email')} {...getInputProps('email')} />
      <TextInput
        mt="sm"
        label={translate('users.fields.password')}
        {...getInputProps('password')}
      />
      <TextInput mt="sm" label={translate('users.fields.role')} {...getInputProps('role')} />
    </Edit>
  );
};
