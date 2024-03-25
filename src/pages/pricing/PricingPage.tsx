import './styles.css';

import { Carousel } from '@mantine/carousel';
import { Box, Center, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import { useCreate, useGetIdentity, useList } from '@refinedev/core';

import { Tour } from '../../components/Tour/Tour';
import { Tariff } from '../../models/Tariff';
import { User } from '../../models/User';
import { Loading } from '../../shared/ui/Loading';
import { CommonPricingCard } from './PricingCard/CommonPricingCard';

export const PricingPage = () => {
  const { mutateAsync } = useCreate();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { data: user } = useGetIdentity<User>();
  const currentTariffId = user?.tariff.id;
  const theme = useMantineTheme();
  const { data: tariffs, isLoading } = useList<Tariff>({
    resource: 'tariffs',
  });
  const otherTariffs =
    currentTariffId === 3 ? tariffs?.data?.filter((tariff) => tariff.id === 3) : tariffs?.data;

  const openModal = (tariff: Tariff) =>
    openConfirmModal({
      title: 'Продолжить покупку',
      children: <Text size="sm">{tariff.description}</Text>,
      labels: { confirm: 'Подтвердить', cancel: 'Отменить' },
      onCancel: () => console.log('cancel'),
      onConfirm: () => {
        mutateAsync({
          resource: '/purchase',
          values: {
            tariffId: tariff.id,
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ margin: isMobile ? '-12px' : '0' }}>
      <Tour />
      <Center mb="md">
        <Title order={2}>Подписка</Title>
      </Center>
      <div style={{ height: 500, display: 'flex' }}>
        <Carousel
          // nextControlIcon={<IconArrowRight size={16} style= />}
          // previousControlIcon={<IconArrowLeft size={16} style= />}
          sx={{ maxWidth: '100vw', flex: 1 }}
          // mx="auto"
          withIndicators
          height="100%"
          align="center"
          slideSize="30%"
          initialSlide={2}
          slideGap="xs"
          breakpoints={[
            { maxWidth: 'md', slideSize: '50%' },
            { maxWidth: 'sm', slideSize: '85%' },
          ]}
        >
          {otherTariffs?.map((tariff, index) => (
            <Carousel.Slide key={index}>
              <CommonPricingCard
                isFirstChild={index === 0}
                isLastChild={otherTariffs.length === index + 1}
                isActive={currentTariffId === tariff.id}
                tariff={tariff}
                theme={theme}
                handleOpenModal={openModal}
                key={tariff.id}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </Box>
  );
};