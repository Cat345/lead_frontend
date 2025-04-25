import { Checkbox, TextInput } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { isEmpty } from '../../shared/validations/isEmpty';

const DEFAULT_IS_ACTIVE = true;
export default function KeywordCreate() {
  const translate = useTranslate();

  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { name: '', isActive: DEFAULT_IS_ACTIVE },
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
        label={translate('keywords.fields.name')}
        {...getInputProps('name')}
        required={true}
      />

      <Checkbox
        id="checkbox-is-active"
        defaultChecked={DEFAULT_IS_ACTIVE}
        mt="sm"
        label={translate('keywords.fields.isActive')}
        {...getInputProps('isActive')}
      />
    </Create>
  );
}
