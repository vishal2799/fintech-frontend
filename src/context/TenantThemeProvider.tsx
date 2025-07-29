import { MantineProvider, createTheme } from '@mantine/core';
import { usePortal } from '../context/PortalContext';
import { generateColors } from '@mantine/colors-generator';

const TenantThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { tenant } = usePortal();

  if (!tenant) return null;

  const primaryHex = tenant.themeColor || '#1D4ED8'; // Fallback color
  const generatedColors = generateColors(primaryHex);

  const theme = createTheme({
    primaryColor: 'tenant',
    colors: {
      tenant: generatedColors,
    },
    // Optional: headings, fontFamily, radius, etc.
  });

  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default TenantThemeProvider;
