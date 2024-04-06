import { FileWithPath } from '@mantine/dropzone';
import { useCreate, useNotification, useResource } from '@refinedev/core';
import { useState } from 'react';
import readXlsxFile, { Schema } from 'read-excel-file';

export const useImport = (schema: Schema, handleSetUserGroupsCount: (number: number) => void) => {
  const { resource } = useResource();
  const { mutateAsync, isSuccess } = useCreate();

  const [isLoading, setIsLoading] = useState(false);
  const notification = useNotification();

  const handleImport = (file: FileWithPath) => {
    setIsLoading(true);
    // @ts-ignore
    readXlsxFile(file, { schema, trim: true })
      .then((readedSheet) => {
        const { rows, errors } = readedSheet;

        if (!errors.length) {
          mutateAsync({
            resource: resource!.name,
            successNotification: {
              message: 'Создан',
              type: 'success',
            },
            values: rows,
          }).then((res) => {
            handleSetUserGroupsCount(res.data);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleImport, isLoading, isSuccess };
};
