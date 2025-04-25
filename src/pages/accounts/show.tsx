import { Title } from '@mantine/core';
import { useShow, useTranslate } from '@refinedev/core';
import { Show, TextField } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';

export default function AccountShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Tour />
      <Title my="xs" order={5}>
        {translate('accounts.fields.phone')}
      </Title>
      <TextField value={record?.phone} id="input-phone" />
      <Title my="xs" order={5}>
        {translate('accounts.fields.type')}
      </Title>
      <TextField value={record?.type} id="input-phone" />
      <Title my="xs" order={5}>
        {translate('accounts.fields.status')}
      </Title>
      <TextField value={record?.status} id="input-phone" />
    </Show>
  );
}
