import { AccessControlProvider } from '@refinedev/core';

import { authProvider } from '../auth/authProvider';

export const getAccessControlProvider = () => {
  const identity = authProvider.getIdentity();
  const accessControlProvider: AccessControlProvider = {
    can: async ({ resource }) => {
      if (resource === 'users' && identity.role !== 'admin') {
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
