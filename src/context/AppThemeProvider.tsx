import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { usePortal } from './PortalContext';
import { generateColors } from '@mantine/colors-generator';

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { tenant, type } = usePortal();

  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  const primary = tenant?.themeColor || '#1D4ED8'; // default to blue
  const generatedTenantColor = generateColors(primary);

  const theme = {
    primaryColor: 'tenant',
    colors: {
      tenant: generatedTenantColor,
    },
    colorScheme,
  };

  return (
    <>
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider theme={theme} defaultColorScheme={colorScheme} withCssVariables>
        <Notifications />
        {children}
      </MantineProvider>
    </>
  );
};
