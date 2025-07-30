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
import { useHasAccess } from "../hooks/useHasAccess";
import { PERMISSIONS } from "../constants/permissions";

export const SidebarNav = ({ staticRole }: { staticRole?: string }) => {

  const navItems = [
    {
      label: 'Dashboard',
      icon: IconGauge,
      link: staticRole === 'SUPER_ADMIN' ? '/' : '/admin',
      allowedRoles: ['SUPER_ADMIN', 'WL_ADMIN'],
    },
    {
      label: 'Tenants',
      icon: IconBuildingSkyscraper,
      initiallyOpened: true,
      links: [
        { label: 'All Tenants', link: '/tenants/list', permission: PERMISSIONS.TENANTS_READ,
      allowedRoles: ['SUPER_ADMIN'] },
        { label: 'Add Tenant', link: '/tenants/create', permission: PERMISSIONS.TENANTS_CREATE,
      allowedRoles: ['SUPER_ADMIN'] },
      ],
    },
    {
      label: 'WL Admins',
      icon: IconUserShield,
      links: [
        { label: 'All WL-Admins', link: '/wl-admins/list', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['SUPER_ADMIN'] },
        { label: 'Add WL Admin', link: '/wl-admins/create', allowedRoles: ['SUPER_ADMIN'] },
      ],
    },
    {
      label: 'Permissions',
      icon: IconLock,
      links: [
        { label: 'All Permissions', link: '/permissions/list', allowedRoles: ['SUPER_ADMIN'] },
        { label: 'Add Permission', link: '/permissions/create', allowedRoles: ['SUPER_ADMIN'] },
      ],
    },
    {
      label: 'Roles',
      icon: IconSettingsCog,
      links: [
        { label: 'All Roles', link: '/roles/list', allowedRoles: ['SUPER_ADMIN'] },
        { label: 'Add Role', link: '/roles/create', allowedRoles: ['SUPER_ADMIN'] },
      ]
    },
    {
      label: 'Employees',
      icon: IconUsersGroup,
      links: [
        { label: 'All Employees', link: '/employees/list', allowedRoles: ['SUPER_ADMIN'] },
        { label: 'Add Employee', link: '/employees/create', allowedRoles: ['SUPER_ADMIN'] },
      ]
    },
    {
      label: 'Wallet Management',
      icon: IconWallet,
      links: [
        { label: 'Tenant List', link: '/wallet/tenant-list', allowedRoles: ['SUPER_ADMIN'] },
        { label: 'Credit Request', link: '/wallet/credit-requests', allowedRoles: ['SUPER_ADMIN'] },
      ]
    },
    {
      label: 'Services',
      icon: IconPackages,
      links: [
        { label: 'Global Services', link: '/services', allowedRoles: ['SUPER_ADMIN']},
      ]
    },
    {
      label: 'Audit Logs',
      icon: IconPresentationAnalytics,
      link: '/logs',
      permission: PERMISSIONS.TENANTS_CREATE,
      allowedRoles: ['SUPER_ADMIN'],
    },
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
      permission: 'MEMBERS_READ',
      allowedRoles: ['WL_ADMIN'],
    },
  ];

  return (
  <ScrollArea className="h-full">
    {navItems.map((item: any) => {
      const hasLinks = Array.isArray(item.links);

      const filteredLinks = hasLinks
        ? item.links.filter((link: any) =>
            useHasAccess(link.permission, link.allowedRoles)
          )
        : [];

      const showDirectLink =
        !hasLinks && useHasAccess(item.permission, item.allowedRoles);

      if (hasLinks && filteredLinks.length === 0) return null;
      if (!hasLinks && !showDirectLink) return null;

      return (
        <LinksGroup
          {...item}
          links={hasLinks ? filteredLinks : undefined}
          key={item.label}
        />
      );
    })}
  </ScrollArea>
  );
};
