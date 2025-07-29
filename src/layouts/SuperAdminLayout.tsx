import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import UserAvatarMenu from "../components/UserAvatarMenu";
import { NavbarNested } from "../portals/super-admin/features/tenants/components/NavbarNested";

const SuperAdminLayout = () => {
        const [opened, { toggle }] = useDisclosure();
const accessToken = useAuthStore((s) => s.accessToken);
if (!accessToken) return <Navigate to="/login" />;
 

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify={"space-between"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={2}>VMudra</Title>
          {/* <MantineLogo size={30} /> */}
          <UserAvatarMenu />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavbarNested />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default SuperAdminLayout;
