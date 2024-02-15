import { hideNotification, showNotification, updateNotification } from '@mantine/notifications';
import { NotificationProvider } from '@refinedev/core';
import { IconCheck, IconX } from '@tabler/icons';

export const notificationProvider = (): NotificationProvider => {
  const activeNotifications: string[] = [];

  const isNotificationActive = (key?: string) => {
    return activeNotifications.includes(key as string);
  };

  const addNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index === -1) {
        activeNotifications.push(key);
      }
    }
  };

  const removeNotification = (key?: string) => {
    if (key) {
      const index = activeNotifications.indexOf(key);
      if (index > -1) {
        activeNotifications.splice(index, 1);
      }
    }
  };

  const notificationProvider: NotificationProvider = {
    open: ({ message, description, type, key }) => {
      if (isNotificationActive(key)) {
        updateNotification({
          id: key!,
          color: type === 'success' ? 'green' : 'red',
          icon: type === 'success' ? <IconCheck size={18} /> : <IconX size={18} />,
          message: message?.toLowerCase().includes('error') ? 'Ошибка' : message,
          title: description,
          autoClose: 5000,
        });
      } else {
        addNotification(key);
        showNotification({
          color: type === 'success' ? 'green' : 'red',
          icon: type === 'success' ? <IconCheck size={18} /> : <IconX size={18} />,
          message: message?.toLowerCase().includes('error') ? 'Ошибка' : message,
          title: description,
          onClose: () => {
            removeNotification(key);
          },
          autoClose: 5000,
        });
      }
    },
    close: (key) => {
      removeNotification(key);
      hideNotification(key);
    },
  };

  return notificationProvider;
};
