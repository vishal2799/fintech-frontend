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
import CreditRequestListPage from "../portals/super-admin/pages/CreditRequestsPage";
import TenantWalletListPage from "../portals/super-admin/pages/TenantWalletListPage";
import PendingCreditRequestListPage from "../portals/super-admin/pages/PendingCreditRequestsPage";
import ServiceListPage from "../portals/super-admin/pages/ServicesListPage";
import { TenantServicesListPage } from "../portals/super-admin/pages/TenantServicesListPage";
import PermissionListPage from "../portals/super-admin/pages/PermissionListPage";
import ServiceOperatorListPage from "../portals/super-admin/pages/ServiceOperatorsList";
import ServiceActionsListPage from "../portals/super-admin/pages/ServiceActionsListPage";
import ServiceActionFormPage from "../portals/super-admin/pages/ServiceActionFormPage";



export const SuperAdminApp = () => {
  const { basename } = usePortal();

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
      {path: '/commission', children: [
        {path: 'service-operators', element: <ServiceOperatorListPage />},
      ]},
      {
        path: '/service-actions', children: [
{index: true, element: <ServiceActionsListPage /> },
           { path: "create", element: <ServiceActionFormPage /> },
            { path: "edit/:id", element: <ServiceActionFormPage /> },
        ]
      },
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
      },
                       {path: "/profile", element: <div>KYC Management: Oversee the KYC verification process of all W/l Admins.</div>},
{
  path: "/report", element: <div> Reports: Comprehensive reports accessible to
Super Admin (see Reporting section below for details). Transaction Monitoring: Real-time view of transactions happening in the system, with
filters by date, type, status, user, etc. For security and support, Super Admin can drill
down into a particular transaction’s details (amount, time, status, any error codes).</div>
},
{
  path: "/api-user", element: <div>API User Management: If external APIs are offered, Super Admin can manage API
clients: generate API keys, monitor usage, set rate limits.</div>
},
{
  path: "/support-ticket", element: <div> Ticket Oversight: The Super Admin can see all support tickets, even those handled by
employees, to ensure SLA compliance on responses.</div>
},  
{
  path: "/scope", element: <div>
    Super Admin Module: This is the top-level administrative interface with control over
the entire system and all white-label partners. Capabilities:<br/>
• White Label Management: Create/manage White-Label Partners, WL Admins,
Configure branding (logos, domain, theme, contact info), Enable/disable modules per
WL Admin, Assign user limits, service access, Set up commission templates or slabs
per WL Admin<br/>
• API User Management: If external APIs are offered, Super Admin can manage API
clients: generate API keys, monitor usage, set rate limits.<br/>
• KYC Management: Oversee the KYC verification process of all W/l Admins.<br/>
• Service Configuration: Enable/disable specific services or products in the portal, e.g.,
enabling domestic money transfer, bill pay, etc., depending on regulatory compliance
or business strategy.<br/>
• System Configuration: Manage settings like portal announcements (notices shown to
all users), content management for certain pages, FAQ entries, support contact info,
etc.<br/>
• Wallet Management: A module b/w Super Admin and Admin to work on the currency
and coin distribution from supper admin to W/l (Admin).<br/>
• Commission & Commercials Setup: Define default commission rates or fees for each
service at w/l Level. The commissions should be complaint with GST and TDS Laws.<br/>
• Transaction Monitoring: Real-time view of transactions happening in the system, with
filters by date, type, status, user, etc. For security and support, Super Admin can drill
down into a particular transaction’s details (amount, time, status, any error codes).<br/>
• Hold / Unhold Funds: If a node is doing suspicious activity or exceeds risk thresholds,
the Super Admin might want to hold their ability to use funds (freeze). The module
allows to put a hold on some amount or the entire balance of any Node in entire
network. Unhold releases it. (This ensures risk control; e.g., if a retailer should not use
₹5000 of their ₹10000 balance, hold ₹5000.)<br/>
• Employee management: Create, read, update, delete (CRUD) internal Employees and
setoff their roles and responsibilities.<br/>
• Reports: Comprehensive reports accessible to Super Admin (see Reporting section below for details).<br/>
• Transaction Monitoring: Real-time view of transactions happening in the system, with
filters by date, type, status, user, etc. For security and support, Super Admin can drill
down into a particular transaction’s details (amount, time, status, any error codes).<br/>
• Audit Logs: Every action by any Node/ User needs to be logged (who did what and
when, like changing commissions, editing user details), for audit and compliance.<br/>
• Ticket Oversight: The Super Admin can see all support tickets, even those handled by
employees, to ensure SLA compliance on responses.
  </div>
}
          // ... rest of your routes
        ],
      },
    ],
    {
      basename: basename
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