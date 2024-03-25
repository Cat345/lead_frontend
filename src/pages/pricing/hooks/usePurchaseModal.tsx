import { Box, Text, TextInput } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useCreate } from '@refinedev/core';
import { useRef } from 'react';

import { Tariff } from '../../../models/Tariff';

export const usePurchaseModal = () => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { mutateAsync } = useCreate();

  return (tariff: Tariff) =>
    openConfirmModal({
      title: 'Продолжить покупку',
      children: (
        <Box>
          <Text size="lg" mb="md">
            {tariff.description}
          </Text>
          <TextInput
            ref={inputRef}
            autoFocus={true}
            placeholder="some-mail@gmail.com"
            label="Контакт для связи"
          />
        </Box>
      ),
      labels: { confirm: 'Подтвердить', cancel: 'Отменить' },
      onCancel: () => console.log('cancel'),
      onConfirm: () => {
        mutateAsync({
          resource: '/purchase',
          values: {
            tariffId: tariff.id,
            contact: inputRef.current?.value,
          },
          successNotification: {
            message: 'Заявка отправлена',
            type: 'success',
          },
          errorNotification: {
            message: 'Произошла ошибка при отправке заявки',
            type: 'error',
          },
        });
      },
    });
};
