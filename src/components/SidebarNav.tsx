import { LinksGroup } from "../components/LinksGroup";
import { ScrollArea } from "@mantine/core";
import { useHasAccess } from "../hooks/useHasAccess";
import { getNavItems, type Scope, type StaticRole } from "../navigation";
import { useAuthStore } from "../stores/useAuthStore";

// export const SidebarNav = ({ staticRole, scope }: { staticRole: StaticRole; scope: Scope }) => {
export const SidebarNav = () => {

  const { user } = useAuthStore();
  const staticRolee = user?.staticRole as StaticRole;
  const scopee = user?.scope as Scope;

  const navItems = getNavItems({ staticRole: staticRolee, scope: scopee });

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
