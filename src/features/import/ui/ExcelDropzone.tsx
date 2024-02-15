import { Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconListCheck, IconUpload, IconX } from '@tabler/icons';
import React from 'react';

import { CustomSchema } from '../../../shared/types/CustomSchema';
import { useImport } from '../hooks/useImport';

type ExcelDropzoneProps = {
  schema: CustomSchema;
};
export const ExcelDropzone: React.FC<ExcelDropzoneProps> = ({ schema }) => {
  const { handleImport, isLoading } = useImport(schema);
  return (
    <Dropzone
      loading={isLoading}
      onDrop={([file]) => {
        handleImport(file);
      }}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={[MIME_TYPES.xlsx]}
    >
      <Group
        // justify="center"
        // gap="xl"
        mih={220}
        style={{ pointerEvents: 'none' }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: 52,
              height: 52,
              color: 'var(--mantine-color-blue-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: 52,
              height: 52,
              color: 'var(--mantine-color-red-6)',
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconListCheck
            style={{
              width: 52,
              height: 52,
              color: 'var(--mantine-color-dimmed)',
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Перетащите таблицу сюда
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Файл должен весить не более 5MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
