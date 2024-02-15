import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector'; // For auto detecting the user language: https://github.com/i18next/i18next-browser-languageDetector
import Backend from 'i18next-http-backend'; // For lazy loading for translations: https://github.com/i18next/i18next-http-backend
import { initReactI18next } from 'react-i18next'; // https://react.i18next.com/latest/using-with-hooks

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ru'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // locale files path
    },
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: ['ru'],
  });

export default i18n;
