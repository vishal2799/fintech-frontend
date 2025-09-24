import { createBrowserRouter, RouterProvider } from "react-router";
import { usePortal } from "../context/PortalContext";
// import Unauthorized from "../portals/common/pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";
import Login from "../portals/common/pages/Login";
import VerifyOtp from "../portals/common/pages/VerifyOtp";
import SuperDistributorListPage from "../portals/wl-admin/pages/SuperDistributorListPage";
import SuperDistributorFormPage from "../portals/wl-admin/pages/SuperDistributorFormPage";
import DistributorListPage from "../portals/wl-admin/pages/DistributorListPage";
import DistributorFormPage from "../portals/wl-admin/pages/DistributorFormPage";
import RetailerListPage from "../portals/wl-admin/pages/RetailerListPage";
import RetailerFormPage from "../portals/wl-admin/pages/RetailerFormPage";
import CreditRequestListPage from "../portals/wl-admin/pages/CreditRequestsList";
import CreditRequestFormPage from "../portals/wl-admin/pages/CreditRequestFormPage";
import WalletPage from "../portals/wl-admin/pages/WalletPage";
import WLServiceSettingsPage from "../portals/wl-admin/pages/WLServiceSettingsPage";
import { TenantDefaultRedirect } from "../components/TenantDefaultRedirect";
import DistributorListPage2 from "../portals/super-distributor/pages/DistributorListPage";
import DistributorFormPage2 from "../portals/super-distributor/pages/DistributorFormPage";
// import TicketListPage from "../portals/retailer/pages/TicketListPage";
// import CreateTicketPage from "../portals/retailer/pages/CreateTicketPage";
// import TicketDetailPage from "../portals/retailer/pages/TicketDetailsPage";
// import DistributorTicketDetail from "../portals/distributor/pages/TicketDetailsPage";
// import DistributorTicketTable from "../portals/distributor/pages/TicketListPage";

// const getTenantRouter = (basename: string) =>
//   createBrowserRouter(
//     [
//       { path: "/admin/login", element: <Login /> },
//       { path: "/admin/verify-otp", element: <VerifyOtp /> },
//       { path: "/retailer/login", element: <Login /> },
//       { path: "/retailer/verify-otp", element: <VerifyOtp /> },
//       { path: "/distributor/login", element: <Login /> },
//       { path: "/distributor/verify-otp", element: <VerifyOtp /> },
//       { path: "/unauthorized", element: <Unauthorized /> },

//       {
//         path: "/admin",
//         element: (
//           <ProtectedRoute allowedRoles={['WL_ADMIN']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Admin Dashboard</div> },
//           {
//             path: "super-distributors",
//             children: [
//               { path: "list", element: <SuperDistributorListPage /> },
//               { path: "create", element: <SuperDistributorFormPage /> },
//               { path: "edit/:id", element: <SuperDistributorFormPage /> },
//             ],
//           },
//           {
//             path: "distributors",
//             children: [
//               { path: "list", element: <DistributorListPage /> },
//               { path: "create", element: <DistributorFormPage /> },
//               { path: "edit/:id", element: <DistributorFormPage /> },
//             ],
//           },
//           {
//             path: "retailers",
//             children: [
//               { path: "list", element: <RetailerListPage /> },
//               { path: "create", element: <RetailerFormPage /> },
//               { path: "edit/:id", element: <RetailerFormPage /> },
//             ],
//           },
//           {
//             path: "wallet",
//             children: [
//               { path: "credit-requests", element: <CreditRequestListPage /> },
//               { path: "add-fund", element: <CreditRequestFormPage /> },
//               { path: "ledger", element: <WalletPage /> },
//             ],
//           },
//           {
//             path: "services",
//             children: [
//               { path: "portal-services", element: <WLServiceSettingsPage /> },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/retailer",
//         element: (
//           <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Retailer Dashboard</div> },
//           {
//             path: "support-ticket",
//             children: [
//               { path: "list", element: <TicketListPage /> },
//               { path: "create", element: <CreateTicketPage /> },
//               { path: "list/:id", element: <TicketDetailPage /> },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/distributor",
//         element: (
//           <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Distributor Dashboard</div> },
//           {
//             path: "support-ticket",
//             children: [
//               { path: "list", element: <DistributorTicketTable /> },
//               { path: "list/:id", element: <DistributorTicketDetail /> },
//             ],
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <div>Not Found</div>,
//       },
//     ],
//     { basename }
//   );

  // You can dynamically get "wl1" from the URL if needed
// const pathParts = window.location.pathname.split("/");
// const tenantId = pathParts[2]; // "wl1"
// const basename = `/tenants/${tenantId}`;

export const TenantApp = () => {
  const { basename } = usePortal();

  const router = createBrowserRouter(
    [
      // Public auth routes
      { path: "login", element: <Login /> },
      { path: "verify-otp", element: <VerifyOtp /> },

      { path: "", element: <TenantDefaultRedirect /> },

      // Admin section
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["WL_ADMIN"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>Admin Dashboard</div> },
          {
            path: "super-distributors",
            children: [
              { path: "list", element: <SuperDistributorListPage /> },
              { path: "create", element: <SuperDistributorFormPage /> },
              { path: "edit/:id", element: <SuperDistributorFormPage /> },
            ],
          },
          {
            path: "distributors",
            children: [
              { path: "list", element: <DistributorListPage /> },
              { path: "create", element: <DistributorFormPage /> },
              { path: "edit/:id", element: <DistributorFormPage /> },
            ],
          },
          {
            path: "retailers",
            children: [
              { path: "list", element: <RetailerListPage /> },
              { path: "create", element: <RetailerFormPage /> },
              { path: "edit/:id", element: <RetailerFormPage /> },
            ],
          },
          {
            path: "wallet",
            children: [
              { path: "credit-requests", element: <CreditRequestListPage /> },
              { path: "add-fund", element: <CreditRequestFormPage /> },
              { path: "ledger", element: <WalletPage /> },
            ],
          },
          {
            path: "services",
            children: [
              { path: "portal-services", element: <WLServiceSettingsPage /> },
            ],
          },
        ],
      },

      // Super Distributor section
      {
        path: "super-distributor",
        element: (
          <ProtectedRoute allowedRoles={["SD"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>Super Distributor Dashboard</div> },
          {
            path: "distributors",
            children: [
              { path: "list", element: <DistributorListPage2 /> },
              { path: "create", element: <DistributorFormPage2 /> },
              { path: "edit/:id", element: <DistributorFormPage2 /> },
            ],
          },
        ]
      },

      // Retailer section
      {
        path: "retailer",
        element: (
          <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>Retailer Dashboard</div> },
        ],
      },

      // Distributor section
      {
        path: "distributor",
        element: (
          <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>Distributor Dashboard</div> },
        ],
      },

      // Fallback
      { path: "*", element: <div>Not Found here</div> },
    ],
    { basename }
  );

  return <RouterProvider router={router} />;
};


// export const TenantApp = () => {
//   const { type, subdomain } = usePortal();
//   const host = window.location.hostname;

//   // const isLocal = window.location.hostname.includes("localhost");

//    // ✅ Feature flag from env (VITE_ENABLE_LOCALHOST_ROUTING=true)
//   const enableLocalRouting = import.meta.env.VITE_ENABLE_LOCALHOST_ROUTING === 'true';

//   // Treat both localhost and "flag-enabled staging" the same way
//   const isLocalLike = host.includes('localhost') || enableLocalRouting;
//   // const isLocal = true;

//   // const basename =
//   //   type !== "superadmin" && isLocal
//   //     ? `/tenants/${subdomain}` // this covers wl1, wl2, etc
//   //     : "/";

//   const basename =
//     type !== "superadmin" && isLocalLike
//       ? `/tenants/${subdomain}` // this covers wl1, wl2, etc
//       : "/";

//   const router = createBrowserRouter(
//     [
//       // Public auth routes
//       { path: "login", element: <Login /> },
//       { path: "verify-otp", element: <VerifyOtp /> },
//       // { path: "retailer/login", element: <Login /> },
//       // { path: "retailer/verify-otp", element: <VerifyOtp /> },
//       // { path: "distributor/login", element: <Login /> },
//       // { path: "distributor/verify-otp", element: <VerifyOtp /> },
//       // { path: "unauthorized", element: <Unauthorized /> },

//       // Admin section
//       {
//         path: "admin",
//         element: (
//           <ProtectedRoute allowedRoles={["WL_ADMIN"]}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Admin Dashboard</div> },
//           {
//             path: "super-distributors",
//             children: [
//               { path: "list", element: <SuperDistributorListPage /> },
//               { path: "create", element: <SuperDistributorFormPage /> },
//               { path: "edit/:id", element: <SuperDistributorFormPage /> },
//             ],
//           },
//           {
//             path: "distributors",
//             children: [
//               { path: "list", element: <DistributorListPage /> },
//               { path: "create", element: <DistributorFormPage /> },
//               { path: "edit/:id", element: <DistributorFormPage /> },
//             ],
//           },
//           {
//             path: "retailers",
//             children: [
//               { path: "list", element: <RetailerListPage /> },
//               { path: "create", element: <RetailerFormPage /> },
//               { path: "edit/:id", element: <RetailerFormPage /> },
//             ],
//           },
//           {
//             path: "wallet",
//             children: [
//               { path: "credit-requests", element: <CreditRequestListPage /> },
//               { path: "add-fund", element: <CreditRequestFormPage /> },
//               { path: "ledger", element: <WalletPage /> },
//             ],
//           },
//           {
//             path: "services",
//             children: [
//               { path: "portal-services", element: <WLServiceSettingsPage /> },
//             ],
//           },
//         ],
//       },

//       // Retailer section
//       {
//         path: "retailer",
//         element: (
//           <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Retailer Dashboard</div> },
//           // {
//           //   path: "support-ticket",
//           //   children: [
//           //     { path: "list", element: <TicketListPage /> },
//           //     { path: "create", element: <CreateTicketPage /> },
//           //     { path: "list/:id", element: <TicketDetailPage /> },
//           //   ],
//           // },
//         ],
//       },

//       // Distributor section
//       {
//         path: "distributor",
//         element: (
//           <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Distributor Dashboard</div> },
//           // {
//           //   path: "support-ticket",
//           //   children: [
//           //     { path: "list", element: <DistributorTicketTable /> },
//           //     { path: "list/:id", element: <DistributorTicketDetail /> },
//           //   ],
//           // },
//         ],
//       },

//       // Fallback
//       { path: "*", element: <div>Not Found here</div> },
//     ],
//     { basename }
//   );

//   return <RouterProvider router={router} />;
// };


// const TenantApp = () => {
//   const { tenant, portalSlug } = usePortal();

//   if (!tenant) return <div>Loading tenant...</div>;

//   const isLocal = window.location.hostname.includes("localhost");
//   const basename = isLocal && portalSlug ? `/tenants/${portalSlug}` : "/";

//   const router = getTenantRouter(basename);

//   return <RouterProvider router={router} />;
// };


export default TenantApp;


// import { createBrowserRouter, RouterProvider } from "react-router";
// import { usePortal } from "../context/PortalContext";
// import Unauthorized from "../portals/common/pages/Unauthorized";
// import ProtectedRoute from "../components/ProtectedRoute";
// import DynamicLayout from "../layouts/DynamicLayout";
// import Login from "../portals/common/pages/Login";
// import VerifyOtp from "../portals/common/pages/VerifyOtp";
// import SuperDistributorListPage from "../portals/wl-admin/pages/SuperDistributorListPage";
// import SuperDistributorFormPage from "../portals/wl-admin/pages/SuperDistributorFormPage";
// import DistributorListPage from "../portals/wl-admin/pages/DistributorListPage";
// import DistributorFormPage from "../portals/wl-admin/pages/DistributorFormPage";
// import RetailerListPage from "../portals/wl-admin/pages/RetailerListPage";
// import RetailerFormPage from "../portals/wl-admin/pages/RetailerFormPage";
// import CreditRequestListPage from "../portals/wl-admin/pages/CreditRequestsList";
// import CreditRequestFormPage from "../portals/wl-admin/pages/CreditRequestFormPage";
// import WalletPage from "../portals/wl-admin/pages/WalletPage";
// import WLServiceSettingsPage from "../portals/wl-admin/pages/WLServiceSettingsPage";
// import TicketListPage from "../portals/retailer/pages/TicketListPage";
// import CreateTicketPage from "../portals/retailer/pages/CreateTicketPage";
// import TicketDetailPage from "../portals/retailer/pages/TicketDetailsPage";
// import DistributorTicketDetail from "../portals/distributor/pages/TicketDetailsPage";
// import DistributorTicketTable from "../portals/distributor/pages/TicketListPage";


// const tenantRouter = createBrowserRouter([
//   // {path: '/', element: <div>Hi</div>},
//   { path: '/admin/login', element: <Login /> },
//   { path: '/admin/verify-otp', element: <VerifyOtp /> },
//   { path: '/retailer/login', element: <Login /> },
//   { path: '/retailer/verify-otp', element: <VerifyOtp /> },
//     { path: '/distributor/login', element: <Login /> },
//   { path: '/distributor/verify-otp', element: <VerifyOtp /> },
//   { path: '/unauthorized', element: <Unauthorized /> },

//   {
//     path: '/admin',
//     element: (
//       <ProtectedRoute allowedRoles={['WL_ADMIN']}>
//         <DynamicLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <div>Admin Dashboard</div> },
//       {path: 'super-distributors', children: [
//               {path: 'list', element: <SuperDistributorListPage />},
//               {path: 'create', element: <SuperDistributorFormPage />},
//               {path: 'edit/:id', element: <SuperDistributorFormPage />},
//       ]},
//       {path: 'distributors', children: [
//               {path: 'list', element: <DistributorListPage />},
//               {path: 'create', element: <DistributorFormPage />},
//               {path: 'edit/:id', element: <DistributorFormPage />},
//       ]},
//       {path: 'retailers', children: [
//               {path: 'list', element: <RetailerListPage />},
//               {path: 'create', element: <RetailerFormPage />},
//               {path: 'edit/:id', element: <RetailerFormPage />},
//       ]},
//       {path: 'wallet', children: [
//               {path: 'credit-requests', element: <CreditRequestListPage />},
//               {path: 'add-fund', element: <CreditRequestFormPage />},
//               {path: 'ledger', element: <WalletPage />},
//       ]},
//       {
//         path: 'services', children: [
//           {path: 'portal-services', element: <WLServiceSettingsPage />}
//         ]
//       }
//     ]
//   },
//   {
//     path: '/retailer',
//     element: (
//       <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//         <DynamicLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <div>Retailer Dashboard</div> },
//       {path: 'support-ticket', children: [
//               {path: 'list', element: <TicketListPage />},
//               {path: 'create', element: <CreateTicketPage />},
//               {path: 'list/:id', element: <TicketDetailPage />},
//       ]},
//     ]
//   },
//     {
//     path: '/distributor',
//     element: (
//       <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//         <DynamicLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <div>Distributor Dashboard</div> },
//       {path: 'support-ticket', children: [
//               {path: 'list', element: <DistributorTicketTable/>},
//               {path: 'list/:id', element: <DistributorTicketDetail />},
//       ]},
//     ]
//   },
//   {
//     path: '*',
//     element: <div>Not Found</div>,
//   },
// ]);


// const TenantApp = () => {
//    const { tenant } = usePortal();

//   if (!tenant) return <div>Loading tenant...</div>;

//   return (
//     <RouterProvider router={tenantRouter} />
//   )
// }

// export default TenantApp
