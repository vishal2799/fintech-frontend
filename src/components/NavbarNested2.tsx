import {
  IconAdjustments,
  IconCalendarStats,
  IconGauge,
  IconNotes,
} from '@tabler/icons-react';
import { Code, ScrollArea } from '@mantine/core';
import { Group } from '@mantine/core';
import { LinksGroup } from './LinksGroup';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/wl-admin' },
  {
    label: 'Members',
    icon: IconNotes,
    initiallyOpened: true, 
    links: [
      { label: 'Super Distributors', link: '/wl-admin/super-distributors/list' },
      { label: 'Add SD', link: '/wl-admin/super-distributors/create' },
      { label: 'Distributors', link: '/wl-admin/distributors/list' },
      { label: 'Add D', link: '/wl-admin/distributors/create' },
      { label: 'Retailers', link: '/wl-admin/retailers/list' },
      { label: 'Add R', link: '/wl-admin/retailers/create' },
      // { label: 'All WL Admins', link: '/super-admin/wl-admins/list' },
      // { label: 'Create WL Admin', link: '/super-admin/wl-admins/create' },
    ],
  },
  {
    label: 'Wallet Management',
    icon: IconCalendarStats,
    links: [
      { label: 'Wallet Dashboard', link: '/wl-admin/wallet/dashboard' },
      { label: 'Request Credit', link: '/wl-admin/wallet/credit-request' },
      { label: 'Credit Requests List', link: '/wl-admin/wallet/credit-requests' },
    ],
  },
  {
    label: 'Services',
    icon: IconCalendarStats,
    links: [
      { label: 'Services', link: '/wl-admin/services' },
      { label: 'API Clients', link: '/super-admin/api-clients' },
      { label: 'Commission Plans', link: '/super-admin/commissions' },
    ],
  },
  { label: 'Settings', icon: IconAdjustments, link: '/super-admin/settings' },
];

export function NavbarNested2() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className="h-full w-full flex flex-col justify-between bg-white dark:bg-zinc-900 px-4 py-3">
      {/* Header */}
      <div className="mb-2">
        <Group justify="space-between">
          {/* <Logo style={{ width: 120 }} /> */}
          VMudra
          <Code fw={700}>v1.0.0</Code>
        </Group>
      </div>

      {/* Nav Links */}
      <ScrollArea className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-1">{links}</div>
      </ScrollArea>

      {/* Footer */}
      {/* <div className="mt-4">
        <UserAvatarMenu />
      </div> */}
    </nav>
  );
}
