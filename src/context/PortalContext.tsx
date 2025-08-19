import { createContext, useContext, useEffect, useState } from 'react';
import { getPortalInfo } from '../utils/getPortalInfo';
import { getTenantDetails } from '../portals/common/api/tenant.api';

type PortalContextType = {
  type: 'superadmin' | 'tenant' | null;
  subdomain: string | null; // In dev path mode, this is tenantId
  portalSlug: string;
  portalPath: string;
  tenant: any | null;
};

const PortalContext = createContext<PortalContextType>({
  type: null,
  subdomain: null,
  portalSlug: '',
  portalPath: '',
  tenant: null,
});

export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const [info] = useState(() => getPortalInfo());
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    // if (info.type === 'tenant' && info.subdomain) {
      if (info.type === 'tenant' && info.subdomain) {
      // In dev: subdomain is actually tenantId from path
      // In prod: subdomain is actual subdomain
      getTenantDetails(info.subdomain)
        .then((res) => setTenant(res))
        .catch(() => setTenant(null));
    }
  }, [info.type, info.subdomain]);

  return (
    <PortalContext.Provider value={{ ...info, tenant }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => useContext(PortalContext);


// import { createContext, useContext, useEffect, useState } from 'react';
// import { getPortalInfo } from '../utils/getPortalInfo';
// import { getTenantDetails } from '../portals/common/api/tenant.api';

// type PortalContextType = {
//   type: 'superadmin' | 'tenant' | null;
//   subdomain: string | null;
//   portalSlug: string;
//   portalPath: string;
//   tenant: any | null;
// };

// const PortalContext = createContext<PortalContextType>({
//   type: null,
//   subdomain: null,
//   portalSlug: '',
//   portalPath: '',
//   tenant: null,
// });

// export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
//   const [info] = useState(() => getPortalInfo());
//   const [tenant, setTenant] = useState(null);

//   useEffect(() => {
//     if (info.type === 'tenant' && info.subdomain) {
//       getTenantDetails(info.subdomain)
//         .then((res) => setTenant(res))
//         .catch(() => setTenant(null));
//     }
//   }, [info]);

//   return (
//     <PortalContext.Provider value={{ ...info, tenant }}>
//       {children}
//     </PortalContext.Provider>
//   );
// };

// export const usePortal = () => useContext(PortalContext);
