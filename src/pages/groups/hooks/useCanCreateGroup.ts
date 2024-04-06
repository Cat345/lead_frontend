import { useEffect, useState } from 'react';

import { User } from '../../../models/User';
import { authProvider } from '../../../refine/auth/authProvider';

export const useCanCreateGroup = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authProvider.getIdentity().then(setUser);
  }, []);

  return user?.groupsCount < user?.tariff?.maxGroups;
};
