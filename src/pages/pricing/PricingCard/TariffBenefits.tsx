import { Divider, MantineTheme, Stack, Text } from '@mantine/core';

type TariffBenefitsProps = {
  benefits: string;
  theme: MantineTheme;
};

export const TariffBenefits = ({ benefits, theme }: TariffBenefitsProps) => {
  const benefitTexts = benefits.split('\\n').filter(Boolean);
  return (
    <Stack w={'100%'} align="center" spacing={10}>
      {benefitTexts.map((benefitText, index) => (
        <>
          {index === 0 && (
            <Divider
              sx={{
                width: '100%',
                borderColor: theme.colorScheme === 'dark' && 'white',
                opacity: theme.colorScheme === 'dark' && 0.6,
              }}
            />
          )}

          <Text fz={'sm'} fw={600}>
            {benefitText}
          </Text>
          <Divider
            sx={{
              width: '100%',
              borderColor: theme.colorScheme === 'dark' && 'white',
              opacity: theme.colorScheme === 'dark' && 0.6,
            }}
          />
        </>
      ))}
    </Stack>
  );
};
