export const getToken = () => localStorage.getItem('accessToken');

export const getUserPayload = (): { roleNames: string[]; tenantId?: string } | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64 = token.split('.')[1];
    const payload = JSON.parse(atob(base64));
    return {
      roleNames: payload.roleNames || [],
      tenantId: payload.tenantId || undefined
    };
  } catch {
    return null;
  }
};

export const isLoggedIn = () => !!getToken();
