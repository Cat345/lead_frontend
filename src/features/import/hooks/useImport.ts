import { FileWithPath } from '@mantine/dropzone';
import { useCreate, useNotification } from '@refinedev/core';
import { useState } from 'react';
import readXlsxFile from 'read-excel-file';

import { CustomSchema, Schema } from '../../../shared/types/CustomSchema';

export const useImport = (initialSchema: CustomSchema) => {
  const { mutate } = useCreate();

  const [isLoading, setIsLoading] = useState(false);
  const notification = useNotification();

  const schema: Schema = {};
  for (const row of initialSchema) {
    if (!row.isInImport) continue;
    schema[row.header] = {
      required: row.required,
      prop: row.prop,
      type: row.type,
    };
  }

  const handleImport = (file: FileWithPath) => {
    setIsLoading(true);
    // @ts-ignore
    readXlsxFile(file, { schema, trim: true })
      .then((readedSheet) => {
        const { rows, errors } = readedSheet;
        console.log({ rows, errors });
        if (!errors.length) {
          rows.forEach((row) => {
            mutate({
              resource: 'keywords',
              successNotification: {
                message: 'Создан',
                type: 'success',
              },
              values: row,
            });
          });
        }

        errors.forEach((error) => {
          if (error.error === 'required') {
            notification?.open?.({
              description: `Не найден столбец ${error.column}`,
              type: 'error',
              message: `Он обязателен`,
            });
          }
        });
      })
      .catch((error) => {
        setIsLoading(error);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleImport, isLoading };
};
