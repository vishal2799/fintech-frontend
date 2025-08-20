import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { usePortal } from "../context/PortalContext";
import UserAvatarMenu from "../components/UserAvatarMenu";
import { SidebarNav } from "../components/SidebarNav";
import ThemeSettingsModalTrigger from "../components/ThemeSettingsModal";
import { TenantLogo } from "../components/TenantLogo";

const DynamicLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { tenantDetails } = usePortal();
  const title = tenantDetails?.name || 'VMudra';

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
          <Group>
            <ThemeSettingsModalTrigger />
          <UserAvatarMenu />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <SidebarNav />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DynamicLayout;
