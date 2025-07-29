import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { usePortal } from "../context/PortalContext";
import UserAvatarMenu from "../components/UserAvatarMenu";
import { SidebarNav } from "../components/SidebarNav";

const DynamicLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { accessToken, user } = useAuthStore();
  const { type, tenant } = usePortal();

  if (!accessToken || !user) return <Navigate to="/login" />;

  const title = type === 'superadmin' ? 'VMudra SuperAdmin' : tenant?.name || 'Tenant';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>{title}</Title>
          <UserAvatarMenu />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <SidebarNav staticRole={user.staticRole} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DynamicLayout;
