import { Title, AppShell, Group, Burger, Skeleton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

export default function WLDashboard() {
      const [opened, { toggle }] = useDisclosure();

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
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            Navbar
            {Array(15)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))}
          </AppShell.Navbar>
          <AppShell.Main>
            <div>
              <Title>White Label Admin Dashboard</Title>
            </div>
          </AppShell.Main>
        </AppShell>
  )
}
