// src/portals/tenant/RetailerLayout.tsx
import { Outlet } from 'react-router';
import { Container, Text } from '@mantine/core';

export default function RetailerLayout() {
  return (
    <Container>
      <Text fw={600} size="xl" mb="md">
        Retailer Portal
      </Text>
      <Outlet />
    </Container>
  );
}
