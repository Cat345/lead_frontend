import { Box, Button, Stack, Text, Title } from '@mantine/core';

import { usePurchase } from '../hooks/usePurchase';
import { PricingCardProps } from './PricingCardProps';
import { TariffBenefits } from './TariffBenefits';

export const CommonPricingCard = ({
  tariff,
  theme,
  isActive,
  isFirstChild,
  isLastChild,
}: PricingCardProps) => {
  const { purchase, isPurchasing } = usePurchase();

  // const borderRadius = isFirstCard ? '0.7rem 0 0 0.7rem' : '0 0.7rem 0.7rem 0';

  let borderRadius = '0';
  if (isFirstChild) {
    borderRadius = '0.7rem 0 0 0.7rem';
  } else if (isLastChild) {
    borderRadius = '0 0.7rem 0.7rem 0';
  }
  return (
    <Box
      sx={{
        boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
        // height: '27rem',
        // width: '22rem',
        // paddingInline: '1.5rem',
        height: '100%',
        padding: '1.5rem',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
        borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '@media (max-width: 755px)': {
          // width: '19rem',
          borderRadius: '0.7rem',
        },
        '@media (min-width: 756px) and (max-width: 820px)': {
          // width: '15rem',
          borderRadius,
        },
      }}
    >
      <Stack w={'100%'} align={'center'} spacing={20}>
        <Text
          sx={{
            fontWeight: 700,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : 'hsl(233, 13%, 49%)',
          }}
          fz={'md'}
        >
          {tariff.name}
        </Text>
        <Title
          order={2}
          sx={{
            color: theme.colorScheme === 'dark' ? 'white' : 'hsl(232, 13%, 33%)',
            fontSize: 35,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {tariff.cost} руб.
        </Title>
        <TariffBenefits benefits={tariff.benefits} theme={theme} />
        <Text sx={{ textAlign: 'center' }}>{tariff.description}</Text>
        {tariff.id === 4 && !isActive ? null : (
          <Button
            onClick={() => {
              if (isActive) {
                return;
              }
              purchase(tariff.id);
            }}
            fullWidth
            variant="light"
            loading={isPurchasing}
          >
            {isActive ? 'Активен' : 'Подписаться'}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
