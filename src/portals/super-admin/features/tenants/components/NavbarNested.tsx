import {
  IconCalendarStats,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { Code, ScrollArea } from '@mantine/core';
import { Group } from '@mantine/core';
import { LinksGroup } from '../../../../../components/LinksGroup';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/super-admin' },
  {
    label: 'Tenants',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'All Tenants', link: '/super-admin/tenants/list' },
      { label: 'Add Tenant', link: '/super-admin/tenants/create' },
      { label: 'All WL Admins', link: '/super-admin/wl-admins/list' },
      { label: 'Create WL Admin', link: '/super-admin/wl-admins/create' }
    ],
  },
  {
    label: 'Wallet Management',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Tenant List', link: '/super-admin/wallet/tenant-list' },
      { label: 'Credit Request', link: '/super-admin/wallet/credit-requests' },
    ],
  },
   {
    label: 'Roles & Permissions',
    icon: IconLock,
    links: [
          { label: 'List Permissions', link: '/super-admin/permissions/list' },
      { label: 'Create Permissions', link: '/super-admin/permissions/create' },
       { label: 'List Roles', link: '/super-admin/roles/list' },
      { label: 'Create Role', link: '/super-admin/roles/create' },
       { label: 'List Employees', link: '/super-admin/employees/list' },
      { label: 'Create Exployee', link: '/super-admin/employees/create' },
    ],
  },
  {
    label: 'Services',
    icon: IconCalendarStats,
    links: [
      { label: 'Global Services', link: '/super-admin/services' },
      // { label: 'API Clients', link: '/super-admin/api-clients' },
      // { label: 'Commission Plans', link: '/super-admin/commissions' },
    ],
  },
  { label: 'Audit Logs', icon: IconPresentationAnalytics, link: '/super-admin/logs' },
  // { label: 'Reports', icon: IconPresentationAnalytics, link: '/super-admin/reports' },
  // { label: 'Contracts', icon: IconFileAnalytics, link: '/super-admin/contracts' },
  // {
  //   label: 'Security',
  //   icon: IconLock,
  //   links: [
  //     { label: 'Enable 2FA', link: '/super-admin/security/2fa' },
  //     { label: 'Change Password', link: '/super-admin/security/change-password' },
  //   ],
  // },
  // { label: 'Settings', icon: IconAdjustments, link: '/super-admin/settings' },
];

export function NavbarNested() {
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
