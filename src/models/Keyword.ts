import { User } from './User';

export type ParseType = 'equals' | 'startsWith' | 'endsWith' | 'contains';

export type Keyword = {
  id: number;
  name: string;
  isActive: boolean;
  user: User;
  conversionRate: number;
  parseType: ParseType;
};
