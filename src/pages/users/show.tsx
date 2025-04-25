import { Title } from '@mantine/core';
import { useShow, useTranslate } from '@refinedev/core';
import { EmailField, NumberField, Show, TextField } from '@refinedev/mantine';

export default function UserShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        {translate('users.fields.id')}
      </Title>
      <NumberField value={record?.id ?? ''} />
      <Title my="xs" order={5}>
        {translate('users.fields.email')}
      </Title>
      <EmailField value={record?.email} />
      <Title my="xs" order={5}>
        {translate('users.fields.password')}
      </Title>
      <TextField value={record?.password} />
      <Title my="xs" order={5}>
        {translate('users.fields.role')}
      </Title>
      <TextField value={record?.role} />
    </Show>
  );
}
