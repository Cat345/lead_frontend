import { InputBase, Select } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/mantine';
import InputMask from 'react-input-mask';

import { Tour } from '../../components/Tour/Tour';
import { isPhoneValid } from '../../shared/validations/isPhoneValid';

export default function AccountEdit() {
  const translate = useTranslate();
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: { phone: '', type: '', status: '' },
    validate: {
      phone: isPhoneValid,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Tour />
      <InputBase
        id="input-phone"
        component={InputMask}
        mask="+7 (999) 999-99-99"
        label={translate('accounts.fields.phone')}
        {...getInputProps('phone')}
      />
      <Select
        id="select-messenger"
        data={['Telegram', 'Whats App']}
        mt="sm"
        label={translate('accounts.fields.type')}
        {...getInputProps('type')}
      />
      <Select
        id="select-is-active"
        mt="sm"
        label={translate('accounts.fields.status')}
        data={[
          { label: 'Активен', value: 'active' },
          { label: 'Неактивен', value: 'inactive' },
        ]}
        {...getInputProps('status')}
      />
    </Edit>
  );
}
