import { MantineProvider } from "@mantine/core"
import { createBrowserRouter, RouterProvider } from "react-router";
import { superAdminRoutes } from "./routes/superadmin/index";
import { Notifications } from "@mantine/notifications";
// import { getSubdomain } from "./utils/tenant";

import '@mantine/notifications/styles.css';

const App = () => {
  // const subdomain = getSubdomain();
  // let appRoutes;
  // if(subdomain === 'superadmin'){
  //   appRoutes = SuperAdminRoutes;
  // } else if(subdomain === 'wl1'){
  //   appRoutes = WLAdminRoutes
  // } else if(subdomain === 'retailer'){
  //   appRoutes = RetailerRoutes
  // } 
  
  // if (!appRoutes) {
  //   return null;
  // }

  const router = createBrowserRouter(superAdminRoutes);

  return (
    <MantineProvider>
            <Notifications />
        <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App