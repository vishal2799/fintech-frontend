import { type RouteObject } from "react-router";
import Login from "../../../../../pages/Login";
import Unauthorized from "../../../../../pages/Unauthorized";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import SuperAdminLayout from "../../../../../layouts/SuperAdminLayout";
import TenantListPage from "../pages/TenantListPage";
import TenantFormPage from "../pages/TenantFormPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import WLAdminListPage from "../../wl-admins/pages/WLAdminListPage";
import WLAdminFormPage from "../../wl-admins/pages/WLAdminFormPage";

export const saRoutes:RouteObject[] = [
{path: '/', element: <Home />},   
{path: '/login', element: <Login />},   
{ path: '/unauthorized', element: <Unauthorized /> },
{
  path: '/super-admin',
  element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
    <SuperAdminLayout />
  </ProtectedRoute>,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'tenants/list', element: <TenantListPage /> },
    {path: 'tenants/create', element: <TenantFormPage />},
    {path: 'tenants/edit/:id', element: <TenantFormPage />},
    {path: "wl-admins", element: <WLAdminListPage /> },
   { path: "wl-admins/create", element: <WLAdminFormPage /> },
{ path: "wl-admins/:id/edit" , element: <WLAdminFormPage />}
  ],
}]