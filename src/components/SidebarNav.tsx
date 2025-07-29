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
          { label: 'All Tenants', link: '/super-admin/tenants/list' },
          { label: 'Add Tenant', link: '/super-admin/tenants/create' },
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
