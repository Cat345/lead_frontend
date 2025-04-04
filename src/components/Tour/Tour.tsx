import { useGetIdentity } from '@refinedev/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useLs from 'use-local-storage';
import { Walktour } from 'walktour';

import { User } from '../../models/User';
import { JoyrideTooltip } from '../Tour/JoyrideTooltip';
import tour from './tour.json';

export const Tour = () => {
  const { data: user } = useGetIdentity<User>();
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState([]);
  const { pathname } = useLocation();
  const [ls, setLs] = useLs(
    'tour',
    Object.keys(tour).reduce(
      (acc: Record<string, boolean>, step) => ({
        ...acc,
        [step]: true,
      }),
      {}
    )
  );
  useEffect(() => {
    if (!ls[pathname]) return;

    const steps = tour[pathname];

    if (steps && steps.length) {
      const timer = setTimeout(() => {
        setSteps(steps);
        setIsOpen(ls[pathname]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pathname, ls[pathname]]);

  const closeTour = () => {
    setIsOpen(false);
  };

  const disableTour = () => {
    closeTour();
    setLs({
      ...ls,
      [pathname]: false,
    });
  };

  if (!user?.telegramAccount || user.remainingSubscribeDays <= 0) {
    return null;
  }

  return (
    <Walktour
      isOpen={isOpen}
      customTooltipRenderer={(props) => (
        <JoyrideTooltip {...props} disableTour={disableTour} closeTour={closeTour} />
      )}
      steps={steps}
    />
  );
};
