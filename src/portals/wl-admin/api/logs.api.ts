import axios from '../../../api/axios';

export const getTenantAuditLogs = async () => {
  const { data } = await axios.get('/logs/tenant');
  return data.data; // assuming { success: true, data: [...] }
};
