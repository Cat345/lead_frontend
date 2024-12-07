const pluralQualityNames = {
  bad: 'Плохих',
  good: 'Хороших',
  neutral: 'Нейтральных',
} as Record<string, string>;

const qualityNames = {
  bad: 'Плохое',
  good: 'Хорошее',
  neutral: 'Нейтральное',
} as Record<string, string>;

export const mapQualityName = (
  quality: string,
  { isPlural = false }: { isPlural?: boolean } = {}
) => {
  return isPlural ? pluralQualityNames[quality] ?? quality : qualityNames[quality] ?? quality;
};
