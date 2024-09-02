import { useCreate } from '@refinedev/core';
import { TelegramUser } from 'telegram-login-button';

export const useAddTelegramAccountToDb = () => {
  const { mutateAsync: createOrUpdateTgAccount } = useCreate();

  return async (userFromTelegram: TelegramUser, userId: number) => {
    // if (!user) {
    //   return;
    // }

    const { first_name, auth_date, id, photo_url, username } = userFromTelegram;
    const telegramAccount = {
      firstName: first_name,
      authDate: auth_date,
      tgId: id,

      username: username,
      photoUrl: photo_url,

      user: {
        id: userId,
      },
    };

    createOrUpdateTgAccount({
      // id: user.id,
      resource: 'telegram-account',
      values: telegramAccount,

      successNotification: {
        type: 'success',
        message: 'Аккаунт добавлен!',
        description: 'Telegram аккаунт добавлен',
      },
      errorNotification(error, values) {
        console.error(error, values);
        return {
          type: 'error',
          message: 'Не удалось добавить Telegram аккаунт',
          description: 'Ошибка',
        };
      },
    });
  };
};
