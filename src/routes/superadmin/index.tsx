import type { RouteObject } from "react-router";
import SuperAdminLayout from "../../layouts/SuperAdminLayout";
import Dashboard from "../../pages/super-admin/Dashboard";
import Users from "../../pages/super-admin/Users";
import Login from "../../pages/Login";
import ProtectedRoute from "../../components/ProtectedRoute";
import Unauthorized from "../../pages/Unauthorized";
import TenantList from "../../pages/super-admin/TenantList";

export const superAdminRoutes:RouteObject[] = [
{path: '/login', element: <Login />},   
{ path: '/unauthorized', element: <Unauthorized /> },
{
  path: '/super-admin',
  element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
    <SuperAdminLayout />
  </ProtectedRoute>,
  children: [
    { index: true, element: <Dashboard /> },
    { path: 'tenants', element: <TenantList /> },
    // { path: 'createtenant', element: <TenantForm /> },
    { path: 'users', element: <Users /> },
    // Add more routes as needed
  ],
}]