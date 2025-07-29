import { MantineProvider } from "@mantine/core"
import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "../common/auth/pages/Login";
import VerifyOtp from "../common/auth/pages/VerifyOtp";
import Unauthorized from "../../pages/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Retailer App</div>,
  },
  {path: '/login', element: <Login />},   
{path: '/verify-otp', element: <VerifyOtp />},   
{ path: '/unauthorized', element: <Unauthorized /> },
 {
    path: "/dashboard",
    element: <div>Retailer Dashboard</div>,
  },
]);

const RetailerPortal = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default RetailerPortal