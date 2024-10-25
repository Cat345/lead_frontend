import { Title } from '@mantine/core';
import { IResourceComponentsProps, useShow, useTranslate } from '@refinedev/core';
import { Show, TextField } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';

export const ArchivedGroupShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Tour />
      <Title my="xs" order={5}>
        {translate('groups.fields.name')}
      </Title>
      <TextField id="input-name" value={record?.name} mb="md" />
      <Title my="xs" order={5}>
        {translate('groups.fields.status')}
      </Title>
      <TextField id="input-status" value={record?.status} />
    </Show>
  );
};
