export const isPhoneValid = (phoneValue: string) =>
  /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/gi.test(phoneValue) ? null : 'Телефон неверен';
