import { type RouteObject } from "react-router";
import Login from "../../../../../pages/Login";
import Unauthorized from "../../../../../pages/Unauthorized";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import SuperAdminLayout from "../../../../../layouts/SuperAdminLayout";
import Dashboard from "../../../../../pages/super-admin/Dashboard";
import TenantListPage from "../pages/TenantListPage";
import Users from "../../../../../pages/super-admin/Users";
import TenantFormPage from "../pages/TenantFormPage";
import Home from "../pages/Home";

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
    { path: 'tenants', element: <TenantListPage /> },
    {path: 'tenants/create', element: <TenantFormPage />},
    {path: 'tenants/:id/edit', element: <TenantFormPage />},
    { path: 'users', element: <Users /> },
    // Add more routes as needed
  ],
}]