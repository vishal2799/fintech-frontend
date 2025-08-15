import { createBrowserRouter, RouterProvider } from "react-router";
import { usePortal } from "../context/PortalContext";
import Login from "../portals/common/pages/Login";
import VerifyOtp from "../portals/common/pages/VerifyOtp";
import Unauthorized from "../portals/common/pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";
import { PermissionGuard } from "../components/PermissionGuard";
import { PERMISSIONS } from "../constants/permissions";
import TenantListPage from "../portals/super-admin/pages/TenantListPage";
import TenantFormPage from "../portals/super-admin/pages/TenantFormPage";
import WLAdminListPage from "../portals/super-admin/pages/WLAdminListPage";
import WLAdminFormPage from "../portals/super-admin/pages/WLAdminFormPage";
import PermissionFormPage from "../portals/super-admin/pages/PermissionFormPage";
import RoleListPage from "../portals/super-admin/pages/RoleListPage";
import RoleFormPage from "../portals/super-admin/pages/RoleFormPage";
import EmployeeListPage from "../portals/super-admin/pages/EmployeeListPage";
import EmployeeFormPage from "../portals/super-admin/pages/EmployeeFormPage";
import BankAccountsListPage from "../portals/super-admin/pages/BankAccountsListPage";
import BankAccountFormPage from "../portals/super-admin/pages/BankAccountFormPage";
import AuthLoginsPage from "../portals/super-admin/pages/AuthLoginsPage";
import ClientAuditLogsPage from "../portals/super-admin/pages/ClientAuditLogsPage";
import CreditRequestListPage from "../portals/wl-admin/pages/CreditRequestsList";
import TenantWalletListPage from "../portals/super-admin/pages/TenantWalletListPage";
import PendingCreditRequestListPage from "../portals/super-admin/pages/PendingCreditRequestsPage";
import ServiceListPage from "../portals/super-admin/pages/ServicesListPage";
import { TenantServicesListPage } from "../portals/super-admin/pages/TenantServicesListPage";
import PermissionListPage from "../portals/super-admin/pages/PermissionListPage";

export const SuperAdminApp = () => {
  const { type } = usePortal();

  const router = createBrowserRouter(
    [
      { path: '/login', element: <Login /> },
      { path: '/verify-otp', element: <VerifyOtp /> },
      { path: '/unauthorized', element: <Unauthorized /> },
      {
        path: "/",
        element: (
          <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'EMPLOYEE']}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>SA Dashboard</div> },
          {
            path: 'tenants',
            children: [
              {
                path: 'list',
                element: (
                  <PermissionGuard
                    allowedRoles={['SUPER_ADMIN']}
                    permission={PERMISSIONS.TENANTS_READ}
                  >
                    <TenantListPage />
                  </PermissionGuard>
                ),
              },
              { path: 'create', element: <TenantFormPage /> },
              { path: 'edit/:id', element: <TenantFormPage /> },
            ]
          },
                  {path: '/wl-admins', children: [
            {path: "list", element: <WLAdminListPage /> },
           { path: "create", element: <WLAdminFormPage /> },
        { path: "edit/:id" , element: <WLAdminFormPage />},
      ]},
      {path: '/permissions', children: [
        {path: "list", element: <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.PERMISSIONS_READ}><PermissionListPage /></PermissionGuard> },
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
      ]},
      {path: '/wallet', children: [
                { path: "tenant-list", element: <TenantWalletListPage /> },
              { path: "pending-credit-requests", element: <PendingCreditRequestListPage /> },
            { path: "credit-requests", element: <CreditRequestListPage /> },
      ]},
      { path: "/logs" , element: <ClientAuditLogsPage />},
      { path: "/auth-logs" , element: <AuthLoginsPage />},
      // { path: "/auth-logs" , element: <AuthLoginsPage />},
      // { path: "/logs" , element: <AuditLogTable />},
            {path: '/services', children: [
      {path: 'global', element:  <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.TENANTS_READ}><ServiceListPage /></PermissionGuard>},
      { path: 'tenant-services', element:  <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.TENANTS_READ}><TenantServicesListPage /></PermissionGuard>},
        ]},
      {
        path: '/settings', children: [
          {path: 'banks', element: <BankAccountsListPage />},
          {path: 'add-bank', element: <BankAccountFormPage />},
          {path: 'edit-bank/:id', element: <BankAccountFormPage />}
        ]
      }  
          // ... rest of your routes
        ],
      },
    ],
    {
      // In dev path mode: /super-admin
      // In prod: ""
      basename: type === "superadmin" && window.location.hostname.includes("localhost")
        ? "/super-admin"
        : "/",
    }
  );

  return <RouterProvider router={router} />;
};


// import { createBrowserRouter, RouterProvider } from "react-router";
// import Unauthorized from "../portals/common/pages/Unauthorized";
// import ProtectedRoute from "../components/ProtectedRoute";
// import DynamicLayout from "../layouts/DynamicLayout";
// import { PermissionGuard } from "../components/PermissionGuard";
// import { PERMISSIONS } from "../constants/permissions";
// import Login from "../portals/common/pages/Login";
// import VerifyOtp from "../portals/common/pages/VerifyOtp";
// import TenantFormPage from "../portals/super-admin/pages/TenantFormPage";
// import TenantListPage from "../portals/super-admin/pages/TenantListPage";
// import PermissionListPage from "../portals/super-admin/pages/PermissionListPage";
// import PermissionFormPage from "../portals/super-admin/pages/PermissionFormPage";
// import RoleListPage from "../portals/super-admin/pages/RoleListPage";
// import RoleFormPage from "../portals/super-admin/pages/RoleFormPage";
// import EmployeeListPage from "../portals/super-admin/pages/EmployeeListPage";
// import EmployeeFormPage from "../portals/super-admin/pages/EmployeeFormPage";
// // import AuditLogTable from "../portals/super-admin/pages/AuditLogsList";
// import ServiceListPage from "../portals/super-admin/pages/ServicesListPage";
// import CreditRequestListPage from "../portals/super-admin/pages/CreditRequestsPage";
// import TenantWalletListPage from "../portals/super-admin/pages/TenantWalletListPage";
// import WLAdminListPage from "../portals/super-admin/pages/WLAdminListPage";
// import WLAdminFormPage from "../portals/super-admin/pages/WLAdminFormPage";
// import { TenantServicesListPage } from "../portals/super-admin/pages/TenantServicesListPage";
// import AuditLogsPage from "../portals/super-admin/pages/AuditLogsPage";
// import PendingCreditRequestListPage from "../portals/super-admin/pages/PendingCreditRequestsPage";
// import BankAccountsListPage from "../portals/super-admin/pages/BankAccountsListPage";
// import BankAccountFormPage from "../portals/super-admin/pages/BankAccountFormPage";
// import AuthLoginsPage from "../portals/super-admin/pages/AuthLoginsPage";
// import ClientAuditLogsPage from "../portals/super-admin/pages/ClientAuditLogsPage";

// const router = createBrowserRouter([
//   {path: '/login', element: <Login />},   
// {path: '/verify-otp', element: <VerifyOtp />},   
// { path: '/unauthorized', element: <Unauthorized /> },
//   {
//     path: "/",
//     element: <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'EMPLOYEE']}><DynamicLayout /></ProtectedRoute>,
//     children: [
//       {index: true, element: <div>SA Dashboard</div>},
//       {path: '/tenants', children: [
//         {path: 'list', element:  <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.TENANTS_READ}><TenantListPage /></PermissionGuard>},
//         {path: 'create', element: <TenantFormPage />},
//         {path: 'edit/:id', element: <TenantFormPage />},
//       ]},
//       {path: '/wl-admins', children: [
//             {path: "list", element: <WLAdminListPage /> },
//            { path: "create", element: <WLAdminFormPage /> },
//         { path: "edit/:id" , element: <WLAdminFormPage />},
//       ]},
//       {path: '/permissions', children: [
//         {path: "list", element: <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.PERMISSIONS_READ}><PermissionListPage /></PermissionGuard> },
//         { path: "create", element: <PermissionFormPage /> },
//         { path: "edit/:id", element: <PermissionFormPage /> },
//       ]},
//       {path: '/roles', children: [
//              {path: "list", element: <RoleListPage /> },
//            { path: "create", element: <RoleFormPage /> },
//             { path: "edit/:id", element: <RoleFormPage /> },
//       ]},
//       {path: '/employees', children: [
//               {path: "list", element: <EmployeeListPage /> },
//            { path: "create", element: <EmployeeFormPage /> },
//             { path: "edit/:id", element: <EmployeeFormPage /> },
//       ]},
//       {path: '/wallet', children: [
//                 { path: "tenant-list", element: <TenantWalletListPage /> },
//               { path: "pending-credit-requests", element: <PendingCreditRequestListPage /> },
//             { path: "credit-requests", element: <CreditRequestListPage /> },
//       ]},
//       { path: "/logs" , element: <ClientAuditLogsPage />},
//       { path: "/auth-logs" , element: <AuthLoginsPage />},
//       // { path: "/auth-logs" , element: <AuthLoginsPage />},
//       // { path: "/logs" , element: <AuditLogTable />},
//             {path: '/services', children: [
//       {path: 'global', element:  <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.TENANTS_READ}><ServiceListPage /></PermissionGuard>},
//       { path: 'tenant-services', element:  <PermissionGuard allowedRoles={['SUPER_ADMIN']} permission={PERMISSIONS.TENANTS_READ}><TenantServicesListPage /></PermissionGuard>},
//         ]},
//       {
//         path: '/settings', children: [
//           {path: 'banks', element: <BankAccountsListPage />},
//           {path: 'add-bank', element: <BankAccountFormPage />},
//           {path: 'edit-bank/:id', element: <BankAccountFormPage />}
//         ]
//       }  
//     ]
//   },
// ]);


// const SuperAdminApp = () => {
//   return (
//       <RouterProvider router={router} />
//   )
// }

// export default SuperAdminApp