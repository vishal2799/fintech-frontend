import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../common/auth/pages/Login";
import VerifyOtp from "../common/auth/pages/VerifyOtp";
import Unauthorized from "../../pages/Unauthorized";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Admin App</div>,
  },
  {path: '/login', element: <Login />},   
{path: '/verify-otp', element: <VerifyOtp />},   
{ path: '/unauthorized', element: <Unauthorized /> },
 {
    path: "/dashboard",
    element: <div>Admin Dashboard</div>,
  },
]);


const AdminPortal = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default AdminPortal