import { Checkbox, TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { isEmpty } from '../../shared/validations/isEmpty';

const DEFAULT_IS_ACTIVE = true;
export const KeywordCreate: React.FC<IResourceComponentsProps> = () => {
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
      <TextInput
        mt="sm"
        label={translate('keywords.fields.name')}
        {...getInputProps('name')}
        required={true}
      />

      <Checkbox
        defaultChecked={DEFAULT_IS_ACTIVE}
        mt="sm"
        label={translate('keywords.fields.isActive')}
        {...getInputProps('isActive')}
      />
    </Create>
  );
};
