import { Box, Button, Stack, Text, Title } from '@mantine/core';

import { PricingCardProps } from './PricingCardProps';
import { TariffBenefits } from './TariffBenefits';

export const PrimaryPricingCard = ({
  theme,
  handleOpenModal,
  tariff,
  isActive,
}: PricingCardProps) => {
  return (
    <Box
      sx={{
        boxShadow: '0px 30px 50px -7px rgba(0,0,0,0.1)',
        height: '31rem',
        width: '22rem',
        paddingInline: '1.5rem',
        background: theme.colors.brand,
        color: 'white',
        borderRadius: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '@media (min-width: 756px) and (max-width: 820px)': {
          width: '15rem',
          borderRadius: '0.7rem',
        },
      }}
    >
      <Stack w={'100%'} align={'center'} spacing={20}>
        <Text
          sx={{
            fontWeight: 700,
          }}
          fz={'md'}
        >
          {tariff.name}
        </Text>
        <Title
          order={2}
          sx={{
            fontSize: 35,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          {tariff.cost} <Text fz={'2rem'}>руб.</Text>
        </Title>
        <TariffBenefits benefits={tariff.benefits} theme={theme} />
        <Text sx={{ textAlign: 'center' }}>{tariff.description}</Text>
        <Button
          onClick={isActive ? () => {} : () => handleOpenModal(tariff.description)}
          sx={{
            backgroundColor: 'white',
            color: theme.colors.brand,

            '&:hover': {
              backgroundColor: 'white',
              opacity: 0.95,
            },
          }}
          fullWidth
        >
          {isActive ? 'Активен' : 'Подписаться'}
        </Button>
      </Stack>
    </Box>
  );
};
