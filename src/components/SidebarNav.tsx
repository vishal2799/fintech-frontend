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
  // let navItems:any = [];

  // if (staticRole === "SUPER_ADMIN") {
  //   navItems = [
  //     { label: 'Dashboard', icon: IconGauge, link: '/' },
  //     {
  //       label: 'Tenants',
  //       icon: IconBuildingSkyscraper,
  //       initiallyOpened: true,
  //       links: [
  //         { label: 'All Tenants', link: '/tenants/list' },
  //         { label: 'Add Tenant', link: '/tenants/create' },
  //       ],
  //     }, 
  //     {
  //       label: 'WL Admins',
  //       icon: IconUserShield,
  //       links: [
  //         { label: 'All WL-Admins', link: '/wl-admins/list' },
  //         { label: 'Add WL Admin', link: '/wl-admins/create' },
  //       ],
  //     },
  //     {
  //       label: 'Permissions',
  //       icon: IconLock,
  //       links: [
  //         { label: 'All Permissions', link: '/permissions/list' },
  //         { label: 'Add Permission', link: '/permissions/create' },
  //       ],
  //     },
  //     {
  //       label: 'Roles',
  //       icon: IconSettingsCog,
  //       links: [
  //         { label: 'All Roles', link: '/roles/list' },
  //         { label: 'Add Role', link: '/roles/create' },
  //       ],
  //     },
  //     {
  //       label: 'Employees',
  //       icon: IconUsersGroup,
  //       links: [
  //         { label: 'All Employees', link: '/employees/list' },
  //         { label: 'Add Employee', link: '/employees/create' },
  //       ],
  //     },
  //      {
  //   label: 'Wallet Management',
  //   icon: IconWallet,
  //   links: [
  //     { label: 'Tenant List', link: '/wallet/tenant-list' },
  //     { label: 'Credit Request', link: '/wallet/credit-requests' },
  //   ],
  // },
  // {
  //   label: 'Services',
  //   icon: IconPackages,
  //   links: [
  //     { label: 'Global Services', link: '/services' },
  //   ],
  // },
  //   { label: 'Audit Logs', icon: IconPresentationAnalytics, link: '/logs' },
  //   ];
  // }

  // if (staticRole === "WL_ADMIN") {
  //   navItems = [
  //     { label: 'Dashboard', icon: IconGauge, link: '/admin' },
  // {
  //   label: 'Members',
  //   icon: IconUsers,
  //   initiallyOpened: true, 
  //   links: [
  //     { label: 'Super Distributors', link: 'super-distributors/list' },
  //     { label: 'Add SD', link: 'super-distributors/create' },
  //     { label: 'Distributors', link: 'distributors/list' },
  //     { label: 'Add D', link: 'distributors/create' },
  //     { label: 'Retailers', link: 'retailers/list' },
  //     { label: 'Add R', link: 'retailers/create' },
  //   ],
  // },
  //   ];
  // }

  const hasAccess = useHasAccess; // shorter alias

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
      permission: 'PERMISSIONS_READ',
      allowedRoles: ['SUPER_ADMIN'],
    },
    {
      label: 'Roles',
      icon: IconSettingsCog,
      links: [
        { label: 'All Roles', link: '/roles/list' },
        { label: 'Add Role', link: '/roles/create' },
      ],
      permission: 'ROLES_READ',
      allowedRoles: ['SUPER_ADMIN'],
    },
    {
      label: 'Employees',
      icon: IconUsersGroup,
      links: [
        { label: 'All Employees', link: '/employees/list' },
        { label: 'Add Employee', link: '/employees/create' },
      ],
      permission: 'EMPLOYEES_READ',
      allowedRoles: ['SUPER_ADMIN'],
    },
    {
      label: 'Wallet Management',
      icon: IconWallet,
      links: [
        { label: 'Tenant List', link: '/wallet/tenant-list' },
        { label: 'Credit Request', link: '/wallet/credit-requests' },
      ],
      permission: 'WALLET_READ',
      allowedRoles: ['SUPER_ADMIN'],
    },
    {
      label: 'Services',
      icon: IconPackages,
      links: [
        { label: 'Global Services', link: '/services' },
      ],
      permission: 'SERVICES_READ',
      allowedRoles: ['SUPER_ADMIN'],
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

      // 👇 Check access for group items (filter their links)
      const filteredLinks = hasLinks
        ? item.links.filter((link: any) =>
            useHasAccess(link.permission, link.allowedRoles)
          )
        : [];

      // 👇 Check access for direct route
      const showDirectLink =
        !hasLinks && useHasAccess(item.permission, item.allowedRoles);

      // Skip if:
      // 1. It's a group and no child links allowed
      // 2. It's a direct link but not allowed
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
