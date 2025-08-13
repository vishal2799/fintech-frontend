import axios from '../../../api/axios';

export const authLoginApi = {
  getAllLogs: () => axios.get("/auth/auth-logins"),
};
