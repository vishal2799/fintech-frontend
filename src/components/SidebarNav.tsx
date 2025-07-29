import { LinksGroup } from "../components/LinksGroup";
import { ScrollArea } from "@mantine/core";
import {
  IconGauge,
  IconNotes,
  IconLock,
} from "@tabler/icons-react";

export const SidebarNav = ({ staticRole }: { staticRole?: string }) => {
  let navItems:any = [];

  if (staticRole === "SUPER_ADMIN") {
    navItems = [
      { label: 'Dashboard', icon: IconGauge, link: '/super-admin' },
      {
        label: 'Tenants',
        icon: IconNotes,
        links: [
          { label: 'All Tenants', link: '/tenants/list' },
          { label: 'Add Tenant', link: '/tenants/create' },
        ],
      },
      {
        label: 'Permissions',
        icon: IconNotes,
        links: [
          { label: 'All Permissions', link: '/permissions/list' },
          { label: 'Add Permission', link: '/permissions/create' },
        ],
      },
      {
        label: 'Roles',
        icon: IconNotes,
        links: [
          { label: 'All Roles', link: '/roles/list' },
          { label: 'Add Role', link: '/roles/create' },
        ],
      },
      {
        label: 'Employees',
        icon: IconNotes,
        links: [
          { label: 'All Employees', link: '/employees/list' },
          { label: 'Add Employee', link: '/employees/create' },
        ],
      },
    ];
  }

  if (staticRole === "WL_ADMIN") {
    navItems = [
      { label: 'Dashboard', icon: IconGauge, link: '/admin' },
      {
        label: 'Employees',
        icon: IconLock,
        links: [
          { label: 'List', link: '/admin/employees/list' },
          { label: 'Create', link: '/admin/employees/create' },
        ],
      },
    ];
  }

  // Add more roles...

  return (
    <ScrollArea className="h-full">
      {navItems.map((item:any) => (
        <LinksGroup {...item} key={item.label} />
      ))}
    </ScrollArea>
  );
};
