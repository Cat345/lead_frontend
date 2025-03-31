export const isPhoneValid = (phoneValue: string) => {
  const regex = /^\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  return regex.test(phoneValue) ? null : 'Телефон неверен';
};
