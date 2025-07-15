import API from "./axios";

export const logoutAPI = () => API.post('/auth/logout');
