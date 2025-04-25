import { Checkbox, TextInput } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { isEmpty } from '../../shared/validations/isEmpty';

export default function LeadEdit() {
  const translate = useTranslate();
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: { name: '', keywords: '' },
    validate: {
      name: (name) => (isEmpty(name) ? 'Название не может быть пустым' : null),
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Tour />
      <TextInput
        id="input-name"
        mt="sm"
        label={translate('leads.fields.name')}
        {...getInputProps('name')}
        required={true}
      />
      <Checkbox
        id="checkbox-is-active"
        mt="sm"
        label={translate('leads.fields.keywords')}
        {...getInputProps('keywords')}
      />
    </Edit>
  );
}
