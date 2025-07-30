import { LinksGroup } from "../components/LinksGroup";
import { ScrollArea } from "@mantine/core";
import {
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
  IconBuildingSkyscraper,
  IconUserShield,
  IconSettingsCog,
  IconUsersGroup,
  IconWallet,
  IconPackages,
  IconUsers,
} from "@tabler/icons-react";

export const SidebarNav = ({ staticRole }: { staticRole?: string }) => {
  let navItems:any = [];

  if (staticRole === "SUPER_ADMIN") {
    navItems = [
      { label: 'Dashboard', icon: IconGauge, link: '/' },
      {
        label: 'Tenants',
        icon: IconBuildingSkyscraper,
        initiallyOpened: true,
        links: [
          { label: 'All Tenants', link: '/tenants/list' },
          { label: 'Add Tenant', link: '/tenants/create' },
        ],
      }, 
      {
        label: 'WL Admins',
        icon: IconUserShield,
        links: [
          { label: 'All WL-Admins', link: '/wl-admins/list' },
          { label: 'Add WL Admin', link: '/wl-admins/create' },
        ],
      },
      {
        label: 'Permissions',
        icon: IconLock,
        links: [
          { label: 'All Permissions', link: '/permissions/list' },
          { label: 'Add Permission', link: '/permissions/create' },
        ],
      },
      {
        label: 'Roles',
        icon: IconSettingsCog,
        links: [
          { label: 'All Roles', link: '/roles/list' },
          { label: 'Add Role', link: '/roles/create' },
        ],
      },
      {
        label: 'Employees',
        icon: IconUsersGroup,
        links: [
          { label: 'All Employees', link: '/employees/list' },
          { label: 'Add Employee', link: '/employees/create' },
        ],
      },
       {
    label: 'Wallet Management',
    icon: IconWallet,
    links: [
      { label: 'Tenant List', link: '/wallet/tenant-list' },
      { label: 'Credit Request', link: '/wallet/credit-requests' },
    ],
  },
  {
    label: 'Services',
    icon: IconPackages,
    links: [
      { label: 'Global Services', link: '/services' },
    ],
  },
    { label: 'Audit Logs', icon: IconPresentationAnalytics, link: '/logs' },
    ];
  }

  if (staticRole === "WL_ADMIN") {
    navItems = [
      { label: 'Dashboard', icon: IconGauge, link: '/admin' },
  {
    label: 'Members',
    icon: IconUsers,
    initiallyOpened: true, 
    links: [
      { label: 'Super Distributors', link: 'super-distributors/list' },
      { label: 'Add SD', link: 'super-distributors/create' },
      { label: 'Distributors', link: 'distributors/list' },
      { label: 'Add D', link: 'distributors/create' },
      { label: 'Retailers', link: 'retailers/list' },
      { label: 'Add R', link: 'retailers/create' },
    ],
  },
    ];
  }

  return (
    <ScrollArea className="h-full">
      {navItems.map((item:any) => (
        <LinksGroup {...item} key={item.label} />
      ))}
    </ScrollArea>
  );
};
