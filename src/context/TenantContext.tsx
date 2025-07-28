// context/TenantContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getTenantDetails } from '@/services/api/tenant';
import { getSubdomain } from '../utils/getSubDomain';

type TenantInfo = {
  id: string;
  name: string;
  logoUrl?: string;
  // any other config
};

const TenantContext = createContext<{ tenant: TenantInfo | null }>({ tenant: null });

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);

  useEffect(() => {
    const subdomain = getSubdomain();
    if (subdomain) {
      getTenantDetails(subdomain)
        .then((data) => setTenant(data))
        .catch(() => setTenant(null));
    }
  }, []);

  return <TenantContext.Provider value={{ tenant }}>{children}</TenantContext.Provider>;
};

export const useTenant = () => useContext(TenantContext);
