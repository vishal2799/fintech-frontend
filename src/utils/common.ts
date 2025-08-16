import { RolePaths } from "../constants/constants";

export function getPathByRole(role: string) {
  return RolePaths.find(r => r.role === role)?.path || '/';
}