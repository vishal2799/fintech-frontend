import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutAPI } from '../api/auth.api';

interface UserPayload {
  name: string;
  email: string;
  roleNames: string[];
  tenantId?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserPayload | null;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => Promise<void>;  // <- make logout async
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      login: ({ accessToken, refreshToken }) => {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        set({
          accessToken,
          refreshToken,
          user: {
            name: payload.name,
            email: payload.email,
            roleNames: payload.roleNames || [],
            tenantId: payload.tenantId || undefined,
          },
        });
      },

      logout: async () => {
  try {
    await logoutAPI(); // call backend
  } catch {
    // ignore failure
  } finally {
    set({ accessToken: null, refreshToken: null, user: null });
  }
},
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);
