import { resourcesForAdmins } from './resourcesForAdmins';
import { resourcesForUsers } from './resourcesForUsers';

export const useResources = () => {
  return [...resourcesForUsers, ...resourcesForAdmins];
};
