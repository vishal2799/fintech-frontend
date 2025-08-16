import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, Navigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { usePortal } from "../context/PortalContext";
import UserAvatarMenu from "../components/UserAvatarMenu";
import { SidebarNav } from "../components/SidebarNav";
// import DarkModeToggle from "../components/DarkModeToggle";
// import { IconPalette } from "@tabler/icons-react";
// import ThemeSettingsPanel from "../components/ThemeSettingsPanel";
import ThemeSettingsModalTrigger from "../components/ThemeSettingsModal";
// import type { Scope, StaticRole } from "../navigation";
// import logo from '../assets/logo.png';
import { TenantLogo } from "../components/TenantLogo";

const DynamicLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { accessToken, user } = useAuthStore();
  const { tenant } = usePortal();

  if (!accessToken || !user) return <Navigate to="/login" />;


  // const title = type === 'superadmin' ? 'SuperAdmin' : tenant?.name || 'Tenant';
  const title = tenant?.name || 'VMudra';

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
           <TenantLogo title={title} />
          {/* <Title order={3}>{title}</Title> */}
          <Group>
            <ThemeSettingsModalTrigger />
            {/* <Popover>
  <Popover.Target>
    <ActionIcon variant="light" title="Theme Settings">
      <IconPalette size={20} />
    </ActionIcon>
  </Popover.Target>
  <Popover.Dropdown>
    <ThemeSettingsPanel />
  </Popover.Dropdown>
</Popover> */}
            {/* <DarkModeToggle /> */}
          <UserAvatarMenu />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {/* <SidebarNav staticRole={user.staticRole as StaticRole} scope={user.scope as Scope} /> */}
        <SidebarNav />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DynamicLayout;
