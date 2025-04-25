import { Title } from '@mantine/core';
import { useShow, useTranslate } from '@refinedev/core';
import { DeleteButton, EditButton, Show, TextField } from '@refinedev/mantine';

import { Tour } from '../../components/Tour/Tour';

export default function LeadShow() {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} headerButtons={[<EditButton />, <DeleteButton />]}>
      <Tour />
      <Title my="xs" order={5}>
        {translate('leads.fields.name')}
      </Title>
      <TextField id="input-name" value={record?.name} />
      <Title my="xs" order={5}>
        {translate('leads.fields.keywords')}
      </Title>
      <TextField id="lead-keywords" value={record?.keywords} />
    </Show>
  );
}
