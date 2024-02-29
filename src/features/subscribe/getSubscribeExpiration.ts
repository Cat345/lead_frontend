import { differenceInDays } from 'date-fns';

import { Tariff } from '../../models/Tariff';

export const getSubscribeExpiration = (subscribeDate?: string, tariff?: Tariff) => {
  if (!subscribeDate || !tariff) {
    return null;
  }

  const daysBeforeExpiration = differenceInDays(new Date(), new Date(subscribeDate));
  return tariff.duration - daysBeforeExpiration;
};
