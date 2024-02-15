import { InputBase, Select } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';
import InputMask from 'react-input-mask';

import { isPhoneValid } from '../../shared/validations/isPhoneValid';

export const AccountCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: { phone: '', type: 'Telegram', status: 'active' },
    validate: {
      phone: isPhoneValid,
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <InputBase
        component={InputMask}
        mask="+7 (999) 999-99-99"
        label={translate('accounts.fields.phone')}
        {...getInputProps('phone')}
      />
      <Select
        data={['Telegram', 'Whats App']}
        mt="sm"
        label={translate('accounts.fields.type')}
        {...getInputProps('type')}
      />
      <Select
        mt="sm"
        label={translate('accounts.fields.status')}
        data={[
          { label: 'Активен', value: 'active' },
          { label: 'Неактивен', value: 'inactive' },
        ]}
        {...getInputProps('status')}
      />
    </Create>
  );
};
