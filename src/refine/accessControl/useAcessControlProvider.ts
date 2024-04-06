import { AccessControlProvider } from '@refinedev/core';

import { authProvider } from '../auth/authProvider';

export const useAccessControlProvider = () => {
  const accessControlProvider: AccessControlProvider = {
    can: async ({ resource }) => {
      const user = await authProvider.getIdentity();
      if (resource === 'профиль' || resource === 'подписка') {
        return {
          can: true,
        };
      }
      if (user?.role === 'admin') {
        return {
          can: true,
        };
      }

      const isSubscribed = user?.remainingSubscribeDays && user?.remainingSubscribeDays > 0;
      if (!isSubscribed) {
        return {
          can: false,
        };
      }

      if (resource === 'accounts') {
        return {
          can: false,
        };
      }
      if (resource === 'users' && user?.role !== 'admin') {
        return {
          can: false,
          reason: 'Unauthorized',
        };
      }

      return { can: true };
    },
    options: {
      buttons: {
        enableAccessControl: true,
        hideIfUnauthorized: true,
      },
    },
  };
  return accessControlProvider;
};
