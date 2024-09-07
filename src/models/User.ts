import { Tariff } from './Tariff';
import { TelegramAccount } from './TelegramAccount';
import { UserSetting } from './UserSetting';

export type User = {
  id: number;
  email: string;
  role: string;
  tariff: Tariff;
  type: string;
  groupsCount: number;
  accountsCount: number;
  keywordsCount: number;

  remainingSubscribeDays: number;

  telegramAccount: TelegramAccount | null;

  userSetting: UserSetting;
};
