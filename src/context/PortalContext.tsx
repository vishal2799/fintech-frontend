// context/PortalContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getPortalInfo, type PortalInfo } from '../utils/getPortalInfo';
import { getTenantDetails } from '../portals/common/api/tenant.api';

type TenantDetails = {
  id?: string;
  name?: string;
  logoUrl?: string;
  themeColor?: string;
  [k: string]: any;
};

type PortalContextValue = PortalInfo & {
  tenantDetails: TenantDetails | null;
  loading: boolean;
  refreshTenantDetails: () => Promise<void>;
};

const PortalContext = createContext<PortalContextValue | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // compute once
  const portalInfo = useMemo(() => getPortalInfo(), []);

  const [tenantDetails, setTenantDetails] = useState<TenantDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(portalInfo.type === 'tenant');

  // fetch tenant details (if we are in tenant mode)
  const fetchTenantDetails = async () => {
    // if (portalInfo.type !== 'tenant' || !portalInfo.tenantId) {
    if (!portalInfo.tenantId) {
      setTenantDetails(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await getTenantDetails(portalInfo.tenantId);
      // your API might return { data: {...} } or the object directly — handle both
      const payload = (res && (res.data ?? res)) || null;
      setTenantDetails(payload);
    } catch (err) {
      console.error('PortalProvider: failed to load tenant details', err);
      setTenantDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTenantDetails();
    // portalInfo is stable (useMemo) so we intentionally leave deps empty
    // if you need to react to pathname changes, add location-based deps here
  }, []); // run once on mount

  const value: PortalContextValue = {
    ...portalInfo,
    tenantDetails,
    loading,
    refreshTenantDetails: fetchTenantDetails,
  };

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
};

export const usePortal = () => {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used inside a PortalProvider');
  return ctx;
};


// import { createContext, useContext, useEffect, useState } from 'react';
// import { getPortalInfo } from '../utils/getPortalInfo';
// import { getTenantDetails } from '../portals/common/api/tenant.api';

// type PortalContextType = {
//   type: 'superadmin' | 'tenant' | null;
//   subdomain: string | null; // In dev path mode, this is tenantId
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
//     // if (info.type === 'tenant' && info.subdomain) {
//       if (info.type === 'tenant' && info.subdomain) {
//       // In dev: subdomain is actually tenantId from path
//       // In prod: subdomain is actual subdomain
//       getTenantDetails(info.subdomain)
//         .then((res) => setTenant(res))
//         .catch(() => setTenant(null));
//     }
//   }, [info.type, info.subdomain]);

//   return (
//     <PortalContext.Provider value={{ ...info, tenant }}>
//       {children}
//     </PortalContext.Provider>
//   );
// };

// export const usePortal = () => useContext(PortalContext);


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
