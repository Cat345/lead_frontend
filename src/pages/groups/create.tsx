import { TextInput } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { isEmpty } from '../../shared/validations/isEmpty';
import { isGroupLinkValid } from '../../shared/validations/isGroupLinkValid';

export default function GroupCreate() {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { name: '', username: '' },
    validate: {
      name: (name) => (isEmpty(name) ? 'Название не может быть пустым' : null),
      username: (username) => {
        if (isEmpty(username)) return 'Название не может быть пустым';
        if (!isGroupLinkValid(username))
          return 'Ссылка должна быть вида https://t.me/lead_pro_service или https://t.me/+gg-wW-_h5RkMTAy';
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
    </Create>
  );
}
