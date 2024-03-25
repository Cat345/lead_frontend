import { MantineTheme } from '@mantine/core';

import { Tariff } from '../../../models/Tariff';

export type PricingCardProps = {
  tariff: Tariff;
  theme: MantineTheme;
  handleOpenModal: (tariff: Tariff) => void;
  isActive: boolean;

  isFirstChild?: boolean;
  isLastChild?: boolean;
};
