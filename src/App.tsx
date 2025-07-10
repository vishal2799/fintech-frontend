import { MantineProvider } from "@mantine/core"
import { createBrowserRouter, RouterProvider } from "react-router";
import { RetailerRoutes, SuperAdminRoutes, WLAdminRoutes } from "./routes";
import { getSubdomain } from "./utils/tenant";


const App = () => {
  const subdomain = getSubdomain();
  let appRoutes;
  if(subdomain === 'superadmin'){
    appRoutes = SuperAdminRoutes;
  } else if(subdomain === 'wl1'){
    appRoutes = WLAdminRoutes
  } else if(subdomain === 'retailer'){
    appRoutes = RetailerRoutes
  } 
  
  if (!appRoutes) {
    return null;
  }

  const router = createBrowserRouter(appRoutes);

  return (
    <MantineProvider>
        <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App