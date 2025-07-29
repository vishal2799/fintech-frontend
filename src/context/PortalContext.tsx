import { createContext, useContext, useEffect, useState } from 'react';
import { getTenantDetails } from './api';
import { getPortalInfo } from '../utils/getPortalInfo';

type PortalContextType = {
  type: 'superadmin' | 'tenant' | null;
  subdomain: string | null;
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
    if (info.type === 'tenant' && info.subdomain) {
      getTenantDetails(info.subdomain)
        .then((res) => setTenant(res))
        .catch(() => setTenant(null));
    }
  }, [info]);

  return (
    <PortalContext.Provider value={{ ...info, tenant }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => useContext(PortalContext);
