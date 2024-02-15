import { generateColors } from '@mantine/colors-generator';
import { ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { I18nProvider, Refine } from '@refinedev/core';
import { RefineThemes } from '@refinedev/mantine';
import routerBindings from '@refinedev/react-router-v6';
import { useTranslation } from 'react-i18next';

import { Providers } from './processes/Providers';
import { Router } from './processes/Router';
import { getAccessControlProvider } from './refine/accessControl/getAcessControlProvider';
import { authProvider } from './refine/auth/authProvider';
import { dataProvider } from './refine/data/dataProvider';
import { notificationProvider } from './refine/notificationProvider';
import { useResources } from './refine/resources/useResources';
import { api } from './shared/api';

function App() {
  const accessControlProvider = getAccessControlProvider();
  const { t, i18n } = useTranslation();
  const resources = useResources();

  const i18nProvider: I18nProvider = {
    translate: (key, options) => t(key, options) as string,
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Providers
      toggleColorScheme={toggleColorScheme}
      colorScheme={colorScheme}
      mantineTheme={{
        ...RefineThemes.Red,
        colorScheme: colorScheme,
        colors: {
          brand: generateColors('#9B2142'),
        },
      }}
    >
      <Refine
        accessControlProvider={accessControlProvider}
        i18nProvider={i18nProvider}
        dataProvider={dataProvider(import.meta.env.VITE_BACKEND_URL, api)}
        notificationProvider={notificationProvider}
        routerProvider={routerBindings}
        authProvider={authProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
          projectId: 'nOZiSu-KRKJsd-WEJrDY',
        }}
      >
        <Router />
      </Refine>
    </Providers>
  );
}

export default App;
