import { AppShell, Group, Burger, Skeleton, Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { NavLink, Outlet } from 'react-router'
import { useAuth } from "../../app/AuthContext";

const SuperAdminLayout = () => {
        const [opened, { toggle }] = useDisclosure();
const { logout } = useAuth()

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
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          VMudra
          {/* <MantineLogo size={30} /> */}
        <Button size="xs" variant="outline" onClick={logout}>Logout</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
            <NavLink to="/superadmin">Dashboard</NavLink>
            <NavLink to="/superadmin/tenants">Tenants</NavLink>
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
  )
}

export default SuperAdminLayout