import { generateColors } from '@mantine/colors-generator';
import { ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { I18nProvider, Refine } from '@refinedev/core';
import { RefineThemes } from '@refinedev/mantine';
import routerBindings from '@refinedev/react-router-v6';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSaveUtmAndReferral } from './features/utm/lib/useSaveUtmAndReferral';
import { Providers } from './processes/Providers';
import { Router } from './processes/Router';
import { useAccessControlProvider } from './refine/accessControl/useAcessControlProvider';
import { authProvider } from './refine/auth/authProvider';
import { dataProvider } from './refine/data/dataProvider';
import { notificationProvider } from './refine/notificationProvider';
import { useResources } from './refine/resources/useResources';
import { api } from './shared/api';
import { Loading } from './shared/ui/Loading';

const queryClient = new QueryClient();
function App() {
  useSaveUtmAndReferral();

  const accessControlProvider = useAccessControlProvider();
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
          //@ts-ignore
          brand: generateColors('#9B2142'),
        },
        cursorType: 'pointer',
      }}
    >
      <React.Suspense fallback={<Loading />}>
        <Refine
          accessControlProvider={accessControlProvider}
          i18nProvider={i18nProvider}
          dataProvider={dataProvider('', api)}
          notificationProvider={notificationProvider}
          routerProvider={routerBindings}
          authProvider={authProvider}
          resources={resources}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: 'nOZiSu-KRKJsd-WEJrDY',
            disableTelemetry: true,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </Refine>
      </React.Suspense>
    </Providers>
  );
}

export default App;
