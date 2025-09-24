import { distributorNavItems } from "./distributor";
import { retailerNavItems } from "./retailer";
import { superAdminNavItems } from "./super-admin";
import { sdNavItems } from "./super-distributor";
import { wlAdminNavItems } from "./wl-admin";

export type StaticRole =
  | 'SUPER_ADMIN'
  | 'WL_ADMIN'
  | 'EMPLOYEE'
  | 'R'
  | 'D'
  | 'SD';

export type Scope = 'PLATFORM' | 'TENANT';

export const getNavItems = ({
  staticRole,
  scope,
}: {
  staticRole: StaticRole;
  scope: Scope;
}) => {
  if (staticRole === 'EMPLOYEE') {
    return scope === 'PLATFORM' ? superAdminNavItems : wlAdminNavItems;
  }

  switch (staticRole) {
    case 'SUPER_ADMIN':
      return superAdminNavItems;
    case 'WL_ADMIN':
      return wlAdminNavItems;
    case 'SD':
      return sdNavItems;  
    case 'R':
      return retailerNavItems;  
    case 'D':
      return distributorNavItems;    
    default:
      return [];
  }
};
