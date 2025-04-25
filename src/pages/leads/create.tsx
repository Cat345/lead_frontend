import { TextInput } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { isEmpty } from '../../shared/validations/isEmpty';

export default function LeadsCreate() {
  const translate = useTranslate();

  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { name: '', keywords: '' },
    validate: {
      name: (name) => (isEmpty(name) ? 'Название не может быть пустым' : null),
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Tour />
      <TextInput
        id="input-name"
        mt="sm"
        label={translate('leads.fields.name')}
        {...getInputProps('name')}
        required={true}
      />
      <TextInput
        id="input-name"
        mt="sm"
        label={translate('leads.fields.keywords')}
        {...getInputProps('keywords')}
      />
    </Create>
  );
}
