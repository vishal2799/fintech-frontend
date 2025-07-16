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
import ServiceListPage from "../../services/pages/ServicesListPage";
import WLDashboard from "../../../../wl-admin/features/user/pages/Dashboard";
import WLAdminServicesPage from "../../../../wl-admin/features/services/pages/ServicesListPage";
import WLAdminLayout from "../../../../../layouts/WLAdminLayout";
import SuperDistributorListPage from "../../../../wl-admin/features/user/pages/SuperDistributorListPage";
import SuperDistributorFormPage from "../../../../wl-admin/features/user/pages/SuperDistributorFormPage";
import DistributorFormPage from "../../../../wl-admin/features/user/pages/DistributorFormPage";
import DistributorListPage from "../../../../wl-admin/features/user/pages/DistributorListPage";
import RetailerListPage from "../../../../wl-admin/features/user/pages/RetailerListPage";
import RetailerFormPage from "../../../../wl-admin/features/user/pages/RetailerFormPage";

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
    {path: "wl-admins/list", element: <WLAdminListPage /> },
   { path: "wl-admins/create", element: <WLAdminFormPage /> },
{ path: "wl-admins/:id/edit" , element: <WLAdminFormPage />},
{ path: "services" , element: <ServiceListPage />}

  ],
},
{
  path: '/wl-admin',
  element: <ProtectedRoute allowedRoles={['WL_ADMIN']}>
    <WLAdminLayout />
  </ProtectedRoute>,
  children: [
    { index: true, element: <WLDashboard /> },
    { path: 'tenants/list', element: <TenantListPage /> },
    { path: "services" , element: <WLAdminServicesPage />},
    { path: 'super-distributors/list', element: <SuperDistributorListPage /> },
{ path: 'super-distributors/create', element: <SuperDistributorFormPage /> },
{ path: 'super-distributors/:id/edit', element: <SuperDistributorFormPage /> },
    { path: 'distributors/list', element: <DistributorListPage /> },
{ path: 'distributors/create', element: <DistributorFormPage /> },
{ path: 'distributors/:id/edit', element: <DistributorFormPage /> },
    { path: 'retailers/list', element: <RetailerListPage /> },
{ path: 'retailers/create', element: <RetailerFormPage /> },
{ path: 'retailers/:id/edit', element: <RetailerFormPage /> },
  ],
}
]