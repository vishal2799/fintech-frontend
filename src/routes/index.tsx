import type { RouteObject } from 'react-router'
import WLDashboard from './wl/Dashboard'
import APIClientDashboard from './api/dashboard'
import SuperAdminLayout from './superadmin/Layout'
import SuperAdminDashboard from './superadmin/Dashboard'
import Tenants from './superadmin/tenants'
import RequireAuth from '../app/RequireAuth'
import LoginPage from './Login'

export const routes: RouteObject[] = [
  {
    path: "/superadmin",
    element: (
            <RequireAuth allowedRoles={['SUPER_ADMIN']}>
              <SuperAdminLayout />
            </RequireAuth>
    ),
    children: [
      {index: true, element: <SuperAdminDashboard />},
      {path: 'tenants', element: <Tenants />}
    ]
  },
  {
    path: "/wl",
    element: <WLDashboard />
  },
  {
    path: "/api",
    element: <APIClientDashboard />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  { path: '/unauthorized', element: <h2>403: Not Authorized</h2> },
  { path: '/', element: <h2>Home</h2> }

]
