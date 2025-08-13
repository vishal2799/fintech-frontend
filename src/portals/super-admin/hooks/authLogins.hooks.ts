import { useQuery } from "@tanstack/react-query";
import { authLoginApi } from "../api/authLogin.api";

export const useAuthLogins = () => {
  return useQuery({
    queryKey: ["authLogins"],
    queryFn: () => authLoginApi.getAllLogs().then(res => res.data.data),
  });
};
