export const normalizeDaysString = (days: number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ['день', 'дня', 'дней'];
  return titles[days % 100 > 4 && days % 100 < 20 ? 2 : cases[days % 10 < 5 ? days % 10 : 5]];
};
