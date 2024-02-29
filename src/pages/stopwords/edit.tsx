import { Checkbox, TextInput } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';
import { isEmpty } from '../../shared/validations/isEmpty';

export const StopwordEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: { name: '', isActive: '' },
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
        label={translate('stopwords.fields.name')}
        {...getInputProps('name')}
      />
      <Checkbox
        id="checkbox-is-active"
        mt="sm"
        label={translate('stopwords.fields.isActive')}
        {...getInputProps('isActive', { type: 'checkbox' })}
      />
    </Edit>
  );
};
