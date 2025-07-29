import { createBrowserRouter, RouterProvider } from "react-router";
import { usePortal } from "../context/PortalContext";
import Unauthorized from "./Unauthorized";
import Login from "../portals/common/auth/pages/Login";
import VerifyOtp from "../portals/common/auth/pages/VerifyOtp";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";
import TenantThemeProvider from "../context/TenantThemeProvider";
import { Notifications } from "@mantine/notifications";

// const router = createBrowserRouter([
//   {
//     path: "/admin",
//     element: <AdminPortal />,
//   },
//   {
//     path: "/retailer",
//     element: <RetailerPortal />,
//   },
//   {
//     path: "*",
//     element: <div>Unknown Portal</div>,
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <TenantLayout />,
//     children: [
//       {
//         path: 'admin',
//         element: <AdminLayout />,
//         children: [
//           { path: 'login', element: <Login /> },
//           {path: 'verify-otp', element: <VerifyOtp />},   
//           { path: 'dashboard', element: <div>Admin Dashboard</div> },
//         ],
//       },
//       {
//         path: 'retailer',
//         element: <RetailerLayout />,
//         children: [
//           { path: 'login', element: <Login /> },
//           {path: 'verify-otp', element: <VerifyOtp />},   
//           { path: 'dashboard', element: <div>Retailer Dashboard</div> },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/unauthorized',
//     element: <Unauthorized />,
//   },
//   {
//     path: '*',
//     element: <div>Not Found</div>,
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <TenantLayout />, // handles theme, AppShell, layout, etc.
//     children: [
//       {
//         path: 'login',
//         element: <Login />,
//       },
//       {
//         path: 'verify-otp',
//         element: <VerifyOtp />,
//       },
//       {
//         path: 'admin',
//         element: (
//           <ProtectedRoute allowedRoles={['WL_ADMIN']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Admin Dashboard</div> },
//           { path: 'employees', element: <div>Employees List</div> },
//         ],
//       },
//       {
//         path: 'retailer',
//         element: (
//           <ProtectedRoute allowedRoles={['RETAILER', 'SD', 'D', 'EMPLOYEE']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Retailer Dashboard</div> },
//         ],
//       },
//     ],
//   },
//   {
//     path: '/unauthorized',
//     element: <Unauthorized />,
//   },
//   {
//     path: '*',
//     element: <div>Not Found</div>,
//   },
// ]);

const tenantRouter = createBrowserRouter([
  { path: '/admin/login', element: <Login /> },
  { path: '/admin/verify-otp', element: <VerifyOtp /> },
  { path: '/retailer/login', element: <Login /> },
  { path: '/retailer/verify-otp', element: <VerifyOtp /> },
  { path: '/unauthorized', element: <Unauthorized /> },

  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['WL_ADMIN']}>
        <DynamicLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <div>Admin Dashboard</div> },
      // other admin routes...
    ]
  },
  {
    path: '/retailer',
    element: (
      <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
        <DynamicLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <div>Retailer Dashboard</div> },
      // other retailer routes...
    ]
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]);


const TenantApp = () => {
   const { tenant } = usePortal();

  if (!tenant) return <div>Loading tenant...</div>;

  return (
<TenantThemeProvider>
  <Notifications />
            <RouterProvider router={tenantRouter} />
</TenantThemeProvider>
  )
}

export default TenantApp

// import { createTheme, MantineProvider } from "@mantine/core";
// import { usePortal } from "../context/PortalContext";
// import { generateColors } from '@mantine/colors-generator';

// export default function TenantApp() {
//   const { tenant } = usePortal();
//   if (!tenant) return <div>Loading tenant...</div>;

  
//   const primary = tenant?.themeColor || '#1D4ED8';
//   const generatedTenantColor = generateColors(primary); // returns array of 10 shades

//   const theme = createTheme({
//     primaryColor: 'tenant',
//     colors: {
//       tenant: generatedTenantColor,
//     },
//   });

//   return (
//     <MantineProvider theme={theme} defaultColorScheme={'light'}>
//       <div>
//       <h2>Tenant Portal</h2>
//       <p>Tenant Name: {tenant.name}</p>
//       <p>Tenant ID: {tenant.id}</p>
//     </div>
//     </MantineProvider>
//   );
// }
