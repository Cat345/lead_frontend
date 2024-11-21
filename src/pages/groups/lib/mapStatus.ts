export const mapStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Ожидание';
    case 'active':
      return 'Активен';
    case 'inactive':
      return 'Неактивен';
    case 'error':
      return 'Ошибка';
    case 'request_sent':
      return 'Запрос отправлен';
    default:
      return 'Неизвестный статус';
  }
};
