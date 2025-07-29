import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../portals/common/auth/pages/Login";
import VerifyOtp from "../portals/common/auth/pages/VerifyOtp";
import Unauthorized from "./Unauthorized";
import { MantineProvider } from "@mantine/core";
// import SuperAdminLayout from "./SuperAdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";

const router = createBrowserRouter([
  {path: '/login', element: <Login />},   
{path: '/verify-otp', element: <VerifyOtp />},   
{ path: '/unauthorized', element: <Unauthorized /> },
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']}><DynamicLayout /></ProtectedRoute>,
    children: [
      {index: true, element: <div>SA Dashboard</div>}
    ]
  },
]);


const SuperAdminApp = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default SuperAdminApp