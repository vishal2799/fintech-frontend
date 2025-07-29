// src/portals/tenant/AdminLayout.tsx
import { Outlet } from 'react-router';
import { Container, Text } from '@mantine/core';

export default function AdminLayout() {
  return (
    <Container>
      <Text fw={600} size="xl" mb="md">
        Admin Portal
      </Text>
      <Outlet />
    </Container>
  );
}
