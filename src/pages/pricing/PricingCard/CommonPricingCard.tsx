import { Box, Button, Stack, Text, Title } from '@mantine/core';

import { PricingCardProps } from './PricingCardProps';
import { TariffBenefits } from './TariffBenefits';

export const CommonPricingCard = ({
  tariff,
  theme,
  isActive,
  isFirstChild,
  isLastChild,
  onClick,
}: PricingCardProps) => {
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
        userSelect: 'none',
        boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
        height: '100%',
        padding: '1.5rem',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white',
        borderRadius,
        display: 'flex',
        flexDirection: 'column',

        '@media (max-width: 755px)': {
          borderRadius: '0.7rem',
        },
        '@media (min-width: 756px) and (max-width: 820px)': {
          borderRadius,
        },
      }}
    >
      <Stack w={'100%'} align={'center'} spacing={20} sx={{ flex: 1 }}>
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
          }}
        >
          {tariff.cost} руб.
        </Title>
        <TariffBenefits benefits={tariff.benefits} theme={theme} />
        <Text sx={{ textAlign: 'center' }}>{tariff.description}</Text>
      </Stack>
      {tariff.id === 4 && !isActive ? null : (
        <Button
          onClick={() => {
            if (isActive) {
              return;
            }
            onClick();
          }}
          fullWidth
          variant="light"
        >
          {isActive ? 'Активен' : 'Подписаться'}
        </Button>
      )}
    </Box>
  );
};
