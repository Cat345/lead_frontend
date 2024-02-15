import { Title } from '@mantine/core';
import { IResourceComponentsProps, useShow, useTranslate } from '@refinedev/core';
import { BooleanField, DeleteButton, EditButton, Show, TextField } from '@refinedev/mantine';

export const KeywordShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} headerButtons={[<EditButton />, <DeleteButton />]}>
      <Title my="xs" order={5}>
        {translate('keywords.fields.name')}
      </Title>
      <TextField value={record?.name} />
      <Title my="xs" order={5}>
        {translate('keywords.fields.isActive')}
      </Title>
      <BooleanField value={record?.isActive} />
    </Show>
  );
};
