import axios from '../api/axios';

// services/api/tenant.ts
export const getTenantDetails = async (subdomain: string) => {
  const res = await axios.get(`/admin/tenants/details`, {
    headers: {
      'X-Subdomain': subdomain, // Optional, since server already extracts
    },
  });
  return res.data.data;
};
