import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

type ProvidersProps = {
  children?: React.ReactNode;
  mantineTheme: MantineThemeOverride;
  colorScheme: ColorScheme;
  toggleColorScheme: (colorScheme?: ColorScheme | undefined) => void;
};
export const Providers: React.FC<ProvidersProps> = ({
  children,
  colorScheme,
  toggleColorScheme,
  mantineTheme,
}) => {
  return (
    <BrowserRouter>
      {/* <RefineKbarProvider> */}
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={mantineTheme} withNormalizeCSS withGlobalStyles>
          <ModalsProvider>
            <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
            <NotificationsProvider position="top-right">
              {children}
              {/* <RefineKbar /> */}
              <UnsavedChangesNotifier />
              {/* TODO: DocumentTitleHandler не работает*/}
              {/* <DocumentTitleHandler /> */}
              {/* <DevtoolsProvider>
              <DevtoolsPanel />
            </DevtoolsProvider> */}
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
      {/* </RefineKbarProvider> */}
    </BrowserRouter>
  );
};
