import { createBrowserRouter, RouterProvider } from "react-router";
import { usePortal } from "../context/PortalContext";
import Unauthorized from "./Unauthorized";
import Login from "../portals/common/auth/pages/Login";
import VerifyOtp from "../portals/common/auth/pages/VerifyOtp";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";
import SuperDistributorListPage from "../portals/wl-admin/features/user/pages/SuperDistributorListPage";
import SuperDistributorFormPage from "../portals/wl-admin/features/user/pages/SuperDistributorFormPage";
import DistributorListPage from "../portals/wl-admin/features/user/pages/DistributorListPage";
import DistributorFormPage from "../portals/wl-admin/features/user/pages/DistributorFormPage";
import RetailerListPage from "../portals/wl-admin/features/user/pages/RetailerListPage";
import RetailerFormPage from "../portals/wl-admin/features/user/pages/RetailerFormPage";

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
  // {path: '/', element: <div>Hi</div>},
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
      {path: 'super-distributors', children: [
              {path: 'list', element: <SuperDistributorListPage />},
              {path: 'create', element: <SuperDistributorFormPage />},
              {path: 'edit/:id', element: <SuperDistributorFormPage />},
      ]},
      {path: 'distributors', children: [
              {path: 'list', element: <DistributorListPage />},
              {path: 'create', element: <DistributorFormPage />},
              {path: 'edit/:id', element: <DistributorFormPage />},
      ]},
      {path: 'retailers', children: [
              {path: 'list', element: <RetailerListPage />},
              {path: 'create', element: <RetailerFormPage />},
              {path: 'edit/:id', element: <RetailerFormPage />},
      ]},
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
            <RouterProvider router={tenantRouter} />
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
