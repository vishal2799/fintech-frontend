import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../portals/common/auth/pages/Login";
import VerifyOtp from "../portals/common/auth/pages/VerifyOtp";
import Unauthorized from "./Unauthorized";
import { MantineProvider } from "@mantine/core";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";
import TenantListPage from "../portals/super-admin/features/tenants/pages/TenantListPage";
import TenantFormPage from "../portals/super-admin/features/tenants/pages/TenantFormPage";
import PermissionListPage from "../portals/super-admin/features/permissions/pages/PermissionListPage";
import PermissionFormPage from "../portals/super-admin/features/permissions/pages/PermissionFormPage";
import { Notifications } from "@mantine/notifications";
import RoleListPage from "../portals/super-admin/features/roles/pages/RoleListPage";
import RoleFormPage from "../portals/super-admin/features/roles/pages/RoleFormPage";
import EmployeeListPage from "../portals/super-admin/features/employee/pages/EmployeeListPage";
import EmployeeFormPage from "../portals/super-admin/features/employee/pages/EmployeeFormPage";

const router = createBrowserRouter([
  {path: '/login', element: <Login />},   
{path: '/verify-otp', element: <VerifyOtp />},   
{ path: '/unauthorized', element: <Unauthorized /> },
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']}><DynamicLayout /></ProtectedRoute>,
    children: [
      {index: true, element: <div>SA Dashboard</div>},
      {path: '/tenants', children: [
        {path: 'list', element: <TenantListPage />},
        {path: 'create', element: <TenantFormPage />},
        {path: 'edit/:id', element: <TenantFormPage />},
      ]},
      {path: '/permissions', children: [
        {path: "list", element: <PermissionListPage /> },
        { path: "create", element: <PermissionFormPage /> },
        { path: "edit/:id", element: <PermissionFormPage /> },
      ]},
      {path: '/roles', children: [
             {path: "list", element: <RoleListPage /> },
           { path: "create", element: <RoleFormPage /> },
            { path: "edit/:id", element: <RoleFormPage /> },
      ]},
      {path: '/employees', children: [
              {path: "list", element: <EmployeeListPage /> },
           { path: "create", element: <EmployeeFormPage /> },
            { path: "edit/:id", element: <EmployeeFormPage /> },
      ]}
    ]
  },
]);


const SuperAdminApp = () => {
  return (
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default SuperAdminApp