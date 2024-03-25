import { User } from './User';

export type Keyword = {
  id: number;

  name: string;

  isActive: boolean;

  user: User;

  conversionRate: number;
};
