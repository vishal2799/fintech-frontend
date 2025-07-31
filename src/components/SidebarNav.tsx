import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "../components/LinksGroup";
import { useAuthStore } from "../stores/useAuthStore";
import { getNavItems, type Scope, type StaticRole } from "../navigation";
import { checkAccess } from "../utils/checkAccess"; // ✅ Pure function

export const SidebarNav = () => {
  const { user } = useAuthStore();
  const staticRole = user?.staticRole as StaticRole;
  const scope = user?.scope as Scope;

  const navItems = getNavItems({ staticRole, scope });

  return (
    <ScrollArea className="h-full">
      {navItems.map((item: any) => {
        const hasLinks = Array.isArray(item.links);

        const filteredLinks = hasLinks
          ? item.links.filter((link: any) =>
              checkAccess(user, link.permission, link.allowedRoles)
            )
          : [];

        const showDirectLink =
          !hasLinks && checkAccess(user, item.permission, item.allowedRoles);

        if (hasLinks && filteredLinks.length === 0) return null;
        if (!hasLinks && !showDirectLink) return null;

        return (
          <LinksGroup
            key={item.label}
            {...item}
            links={hasLinks ? filteredLinks : undefined}
          />
        );
      })}
    </ScrollArea>
  );
};
