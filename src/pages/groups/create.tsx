import { Select, TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { statusesRowVariants } from '../../constants/statuses';
import { isEmpty } from '../../shared/validations/isEmpty';
import { isGroupLinkValid } from '../../shared/validations/isGroupLinkValid';

export const GroupCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { name: '', username: '', status: statusesRowVariants[0].value },
    validate: {
      name: (name) => (isEmpty(name) ? 'Название не может быть пустым' : null),
      username: (username) => {
        if (isEmpty(username)) return 'Название не может быть пустым';
        if (!isGroupLinkValid(username))
          return 'Ссылка должна быть вида https://t.me/lead_pro_service';
        return null;
      },
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Tour />
      <TextInput
        id="input-name"
        mt="sm"
        label={translate('groups.fields.name')}
        {...getInputProps('name')}
      />
      <TextInput
        id="input-username"
        mt="sm"
        label="Ссылка на группу"
        {...getInputProps('username')}
      />
      <Select
        id="select-status"
        label={translate('groups.fields.status')}
        data={statusesRowVariants}
        {...getInputProps('status')}
      />
    </Create>
  );
};
