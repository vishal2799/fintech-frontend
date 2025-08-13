import axios from '../../../api/axios';

export const getAllAuditLogs = async () => {
  const { data } = await axios.get('/logs/client');
  return data.data; // assuming { success: true, data: [...] }
};
