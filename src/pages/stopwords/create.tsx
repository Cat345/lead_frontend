import { Checkbox, TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { isEmpty } from '../../shared/validations/isEmpty';

const DEFAULT_IS_ACTIVE = true;
export const StopwordCreate: React.FC<IResourceComponentsProps> = () => {
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
        label={translate('stopwords.fields.name')}
        {...getInputProps('name')}
        required={true}
      />

      <Checkbox
        id="checkbox-is-active"
        defaultChecked={DEFAULT_IS_ACTIVE}
        mt="sm"
        label={translate('stopwords.fields.isActive')}
        {...getInputProps('isActive')}
      />
    </Create>
  );
};
