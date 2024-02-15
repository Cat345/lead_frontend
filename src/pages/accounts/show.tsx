import { Title } from '@mantine/core';
import { IResourceComponentsProps, useShow, useTranslate } from '@refinedev/core';
import { Show, TextField } from '@refinedev/mantine';

export const AccountShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        {translate('accounts.fields.phone')}
      </Title>
      <TextField value={record?.phone} />
      <Title my="xs" order={5}>
        {translate('accounts.fields.type')}
      </Title>
      <TextField value={record?.type} />
      <Title my="xs" order={5}>
        {translate('accounts.fields.status')}
      </Title>
      <TextField value={record?.status} />
    </Show>
  );
};
