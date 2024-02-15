import { Title } from '@mantine/core';
import { IResourceComponentsProps, useShow, useTranslate } from '@refinedev/core';
import { Show, TextField } from '@refinedev/mantine';

export const GroupShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        {translate('groups.fields.name')}
      </Title>
      <TextField value={record?.name} mb="md" />
      <Title my="xs" order={5}>
        {translate('groups.fields.status')}
      </Title>
      <TextField value={record?.status} />
    </Show>
  );
};
