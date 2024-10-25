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
    default:
      return 'Неизвестный статус';
  }
};
