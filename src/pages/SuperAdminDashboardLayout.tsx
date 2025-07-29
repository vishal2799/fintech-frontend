// src/portals/tenant/RetailerLayout.tsx
import { Outlet } from 'react-router';
import { Container, Text } from '@mantine/core';

export default function SuperAdminDashboardLayout() {
  return (
    <Container>
      <Text fw={600} size="xl" mb="md">
        Super Admin Dashboard Portal
      </Text>
      <Outlet />
    </Container>
  );
}
