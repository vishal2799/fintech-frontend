// src/layouts/TenantLayout.tsx
import { Outlet } from 'react-router';
import { usePortal } from '../context/PortalContext';
import { AppShell, Text, Container } from '@mantine/core';

export default function TenantLayout() {
  const { tenant } = usePortal();

  if (!tenant) return <div>Loading tenant...</div>;

  return (
    <AppShell
      header={{height: 60}}
    >
        <AppShell.Header>
          <Text fw={600} size="lg" style={{ color: tenant.themeColor }}>
            {tenant.name} Portal
          </Text>
        </AppShell.Header>
      <Container>
        <Outlet /> {/* renders child routes like /admin/login, /retailer/dashboard */}
      </Container>
    </AppShell>
  );
}
