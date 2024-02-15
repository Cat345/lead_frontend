import { useTranslate } from '@refinedev/core';

import { CustomSchema } from '../../shared/types/CustomSchema';

export const useSchema = () => {
  const translate = useTranslate();
  const schema: CustomSchema = [
    {
      id: 'name',
      header: translate('keywords.fields.name'),
      type: String,
      isInImport: true,
    },
    {
      id: 'isActive',
      header: translate('keywords.fields.isActive'),
      isInImport: false,
    },
  ];

  return schema;
};
