import './styles.css';

import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetIdentity, useList } from '@refinedev/core';
import { IconCheck } from '@tabler/icons';
import { useState } from 'react';

import { Tour } from '../../components/Tour/Tour';
import { Tariff } from '../../models/Tariff';
import { User } from '../../models/User';
import { Loading } from '../../shared/ui/Loading';
import { usePurchase } from './hooks/usePurchase';
import { CommonPricingCard } from './PricingCard/CommonPricingCard';

export default function PricingPage() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [isPurchaseModalOpened, setIsPurchaseModalOpened] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const { purchase, isPurchasing } = usePurchase();

  const { data: user } = useGetIdentity<User>();
  const currentTariffId = user?.tariff.id;
  const theme = useMantineTheme();
  const { data: tariffs, isLoading } = useList<Tariff>({
    resource: 'tariffs',
  });
  const otherTariffs =
    currentTariffId === 3 ? tariffs?.data?.filter((tariff) => tariff.id === 3) : tariffs?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ margin: isMobile ? '-12px' : '0' }}>
      <Tour />
      <Center mb="md">
        <Title order={2}>Подписка</Title>
      </Center>
      <div style={{ height: 480, display: 'flex' }}>
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
                isActive={
                  user?.remainingSubscribeDays >= 0 &&
                  (currentTariffId === tariff.id ||
                    (tariff.id !== 4 && currentTariffId > tariff.id))
                }
                tariff={tariff}
                theme={theme}
                key={tariff.id}
                onClick={() => {
                  setSelectedTariff(tariff);
                  setIsPurchaseModalOpened(true);
                }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <Modal
        opened={isPurchaseModalOpened}
        onClose={() => setIsPurchaseModalOpened(false)}
        title={
          <Title order={3} sx={{ textAlign: 'center' }}>
            {selectedTariff?.name}
          </Title>
        }
        size="lg"
      >
        <Box sx={{ padding: '20px' }}>
          <Text size="lg" weight={500} align="center" mb="md">
            {selectedTariff?.description}
          </Text>

          <Stack spacing="md">
            {selectedTariff?.benefits.split('\\n')?.map((feature, index) => (
              <Group key={index} noWrap spacing="xs">
                <ThemeIcon size={24} radius="xl" variant="light" color={theme.primaryColor}>
                  <IconCheck size={16} />
                </ThemeIcon>
                <Text>{feature}</Text>
              </Group>
            ))}
          </Stack>

          <Group position="center" mt="xl">
            <Button
              size="lg"
              loading={isPurchasing}
              onClick={() => selectedTariff && purchase(selectedTariff.id)}
            >
              Оформить подписку
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
}
