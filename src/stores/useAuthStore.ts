import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logoutAPI } from '../portals/common/api/auth.api'
import { getTenantKey } from '../utils/getTenantKey'

interface UserPayload {
  name: string
  email: string
  staticRole?: string
  roleNames: string[]
  tenantId?: string
  permissions: string[]
  scope: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: UserPayload | null
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  login: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => Promise<void>
}

const tenantKey = getTenantKey()
console.log('[AuthStore] Using tenant key:', tenantKey)

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      login: ({ accessToken, refreshToken }) => {
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        set({
          accessToken,
          refreshToken,
          user: {
            name: payload.name,
            email: payload.email,
            tenantId: payload.tenantId || undefined,
            staticRole: payload.staticRole || undefined,
            roleNames: payload.roleNames || [],
            permissions: payload.permissions || [],
            scope: payload.scope,
          },
        })
      },

      logout: async () => {
        try {
          await logoutAPI()
        } catch {
          // ignore errors
        } finally {
          localStorage.removeItem('user-theme-color')
          set({ accessToken: null, refreshToken: null, user: null })
        }
      },
    }),
    {
      name: `auth-storage-${tenantKey}`,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
      onRehydrateStorage: (state) => {
        return () => {
          state?.setHasHydrated(true)
        }
      },
    }
  )
)




// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { logoutAPI } from '../portals/common/api/auth.api';
// import { getTenantKey } from '../utils/getTenantKey';

// interface UserPayload {
//   name: string;
//   email: string;
//   staticRole?: string;
//   roleNames: string[];
//   tenantId?: string;
//   permissions: string[];
//   scope: string;
// }

// interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   user: UserPayload | null;
//   login: (tokens: { accessToken: string; refreshToken: string }) => void;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       accessToken: null,
//       refreshToken: null,
//       user: null,

//       login: ({ accessToken, refreshToken }) => {
//         const payload = JSON.parse(atob(accessToken.split('.')[1]));
//         set({
//           accessToken,
//           refreshToken,
//           user: {
//             name: payload.name,
//             email: payload.email,
//             tenantId: payload.tenantId || undefined,
//             staticRole: payload.staticRole || undefined,
//             roleNames: payload.roleNames || [],
//             permissions: payload.permissions || [],
//             scope: payload.scope
//           },
//         });
//       },

//       logout: async () => {
//         try {
//           await logoutAPI();
//         } catch {
//           // ignore failure
//         } finally {
//           localStorage.removeItem('user-theme-color');
//           set({ accessToken: null, refreshToken: null, user: null });
//         }
//       },
//     }),
//     {
//       name: `auth-storage-${getTenantKey()}`, // tenant-specific key
//       partialize: (state) => ({
//         accessToken: state.accessToken,
//         refreshToken: state.refreshToken,
//         user: state.user,
//       }),
//     }
//   )
// );


// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { logoutAPI } from '../portals/common/api/auth.api';

// interface UserPayload {
//   name: string;
//   email: string;
//   staticRole?: string;
//   roleNames: string[]; // dynamic roles (for employees)
//   tenantId?: string;
//   permissions: string[];
//   scope: string
// }

// interface AuthState {
//   accessToken: string | null;
//   refreshToken: string | null;
//   user: UserPayload | null;
//   login: (tokens: { accessToken: string; refreshToken: string }) => void;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       accessToken: null,
//       refreshToken: null,
//       user: null,

//       login: ({ accessToken, refreshToken }) => {
//         const payload = JSON.parse(atob(accessToken.split('.')[1]));
//         set({
//           accessToken,
//           refreshToken,
//           user: {
//             name: payload.name,
//             email: payload.email,
//             tenantId: payload.tenantId || undefined,
//             staticRole: payload.staticRole || undefined,
//             roleNames: payload.roleNames || [],
//             permissions: payload.permissions || [],
//             scope: payload.scope
//           },
//         });
//       },

//       logout: async () => {
//         try {
//           await logoutAPI();
//         } catch {
//           // ignore failure
//         } finally {
//           localStorage.removeItem('user-theme-color');
//           set({ accessToken: null, refreshToken: null, user: null });
//         }
//       },
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({
//         accessToken: state.accessToken,
//         refreshToken: state.refreshToken,
//         user: state.user,
//       }),
//     }
//   )
// );
