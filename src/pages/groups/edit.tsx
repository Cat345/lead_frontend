import { Select, TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/mantine';

import { statusesRowVariants } from '../../constants/statuses';
import { isEmpty } from '../../shared/validations/isEmpty';

export const GroupEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: { name: '', username: '', status: statusesRowVariants[0].value },
    validate: {
      name: (name) => (isEmpty(name) ? 'Название не может быть пустым' : null),
      username: (username) => (isEmpty(username) ? 'Название не может быть пустым' : null),
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label={translate('groups.fields.name')} {...getInputProps('name')} />
      <TextInput
        mt="sm"
        label={translate('groups.fields.username')}
        {...getInputProps('username')}
      />
      <Select
        label={translate('groups.fields.status')}
        data={statusesRowVariants}
        {...getInputProps('status')}
      />
    </Edit>
  );
};
