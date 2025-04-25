import { MantineTheme } from '@mantine/core';

import { Tariff } from '../../../models/Tariff';

export type PricingCardProps = {
  tariff: Tariff;
  theme: MantineTheme;
  isActive: boolean;

  isFirstChild?: boolean;
  isLastChild?: boolean;

  onClick: () => void;
};
