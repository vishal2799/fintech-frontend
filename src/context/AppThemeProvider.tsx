import { MantineProvider, ColorSchemeScript, type MantineThemeOverride } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { generateColors } from '@mantine/colors-generator';
import { useMemo } from 'react';
import { usePortal } from './PortalContext';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const { tenant, type } = usePortal();

  const [colorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  // 👇 User override (per user, per browser)
  const [userColor] = useLocalStorage<string>({
    key: 'user-theme-color',
    defaultValue: '',
  });

  // 👇 Priority: User > Tenant > Default
  const primaryColor = type === 'superadmin'
  ? userColor || tenant?.themeColor || '#1D4ED8'
  : tenant?.themeColor || '#1D4ED8';
  // const primaryColor = userColor || tenant?.themeColor || '#1D4ED8';

  const theme: MantineThemeOverride = useMemo(() => {
    return {
      primaryColor: 'tenant',
      colors: {
        tenant: generateColors(primaryColor),
      },
      colorScheme,
    };
  }, [primaryColor, colorScheme]);

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


// import { MantineProvider, ColorSchemeScript } from '@mantine/core';
// import { useLocalStorage } from '@mantine/hooks';
// import { Notifications } from '@mantine/notifications';
// import { usePortal } from './PortalContext';
// import { generateColors } from '@mantine/colors-generator';

// export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const { tenant } = usePortal();

//   const [colorScheme] = useLocalStorage<'light' | 'dark'>({
//     key: 'color-scheme',
//     defaultValue: 'light',
//   });

//   const primary = tenant?.themeColor || '#1D4ED8'; // default to blue
//   const generatedTenantColor = generateColors(primary);

//   const theme = {
//     primaryColor: 'tenant',
//     colors: {
//       tenant: generatedTenantColor,
//     },
//     colorScheme,
//   };

//   return (
//     <>
//       <ColorSchemeScript defaultColorScheme="light" />
//       <MantineProvider theme={theme} defaultColorScheme={colorScheme} withCssVariables>
//         <Notifications />
//         {children}
//       </MantineProvider>
//     </>
//   );
// };
