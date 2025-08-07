import { createBrowserRouter, RouterProvider } from "react-router";
import { usePortal } from "../context/PortalContext";
import Unauthorized from "../portals/common/pages/Unauthorized";
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
import TicketListPage from "../portals/retailer/pages/TicketListPage";
import CreateTicketPage from "../portals/retailer/pages/CreateTicketPage";
import TicketDetailPage from "../portals/retailer/pages/TicketDetailsPage";
import DistributorTicketDetail from "../portals/distributor/pages/TicketDetailsPage";
import DistributorTicketTable from "../portals/distributor/pages/TicketListPage";


const tenantRouter = createBrowserRouter([
  // {path: '/', element: <div>Hi</div>},
  { path: '/admin/login', element: <Login /> },
  { path: '/admin/verify-otp', element: <VerifyOtp /> },
  { path: '/retailer/login', element: <Login /> },
  { path: '/retailer/verify-otp', element: <VerifyOtp /> },
    { path: '/distributor/login', element: <Login /> },
  { path: '/distributor/verify-otp', element: <VerifyOtp /> },
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
      {path: 'wallet', children: [
              {path: 'credit-requests', element: <CreditRequestListPage />},
              {path: 'add-fund', element: <CreditRequestFormPage />},
              {path: 'ledger', element: <WalletPage />},
      ]},
      {
        path: 'services', children: [
          {path: 'portal-services', element: <WLServiceSettingsPage />}
        ]
      }
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
      {path: 'support-ticket', children: [
              {path: 'list', element: <TicketListPage />},
              {path: 'create', element: <CreateTicketPage />},
              {path: 'list/:id', element: <TicketDetailPage />},
      ]},
    ]
  },
    {
    path: '/distributor',
    element: (
      <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
        <DynamicLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <div>Distributor Dashboard</div> },
      {path: 'support-ticket', children: [
              {path: 'list', element: <DistributorTicketTable/>},
              {path: 'list/:id', element: <DistributorTicketDetail />},
      ]},
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
