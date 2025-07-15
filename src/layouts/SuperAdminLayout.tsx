import { AppShell, Burger, Group, Skeleton, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigate, NavLink, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import UserAvatarMenu from "../components/UserAvatarMenu";

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
            <NavLink to="/super-admin">Dashboard</NavLink>
            <NavLink to="/super-admin/tenants">Tenants</NavLink>
            <NavLink to="/superadmin/api-clients">API Clients</NavLink>
        {/* <NavLink
        href="#required-for-focus"
        label="First parent link"
        leftSection={<IconGauge size={16} stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="#required-for-focus" label="First child link" />
        <NavLink label="Second child link" href="#required-for-focus" />
        <NavLink label="Nested parent link" childrenOffset={28} href="#required-for-focus">
          <NavLink label="First child link" href="#required-for-focus" />
          <NavLink label="Second child link" href="#required-for-focus" />
          <NavLink label="Third child link" href="#required-for-focus" />
        </NavLink>
      </NavLink> */}
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default SuperAdminLayout;
