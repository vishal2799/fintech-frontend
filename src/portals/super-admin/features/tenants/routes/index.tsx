import { type RouteObject } from "react-router";
import Login from "../../../../../pages/Login";
import Unauthorized from "../../../../../pages/Unauthorized";
import ProtectedRoute from "../../../../../components/ProtectedRoute";
import SuperAdminLayout from "../../../../../layouts/SuperAdminLayout";
import TenantListPage from "../pages/TenantListPage";
import TenantFormPage from "../pages/TenantFormPage";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

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
  ],
}]