const qualityDic = {
  bad: 'Плохое',
  good: 'Хорошее',
  neutral: 'Нейтральное',
} as Record<string, string>;

export const mapQualityName = (quality: string) => {
  return qualityDic[quality] ?? quality;
};
