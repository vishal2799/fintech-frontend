import { MantineProvider } from "@mantine/core"
import { createBrowserRouter, RouterProvider } from "react-router";
import { Notifications } from "@mantine/notifications";
// import { getSubdomain } from "./utils/tenant";

import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { saRoutes } from "./portals/super-admin/features/tenants/routes";
import { useEffect, useState } from "react";

const users = [
  {
    username: 'john'
  },
  {
    username: 'tom'
  }
]

const App = () => {
  const [subDomain, setSubDomain] = useState(null);
  useEffect(() => {
    const host = window.location.host;

    const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);
    if(arr.length > 0) setSubDomain(arr[0]);
  
  }, []);

  const requestedUser = users.find((user) => user?.username === subDomain);
  
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

  const router = createBrowserRouter(saRoutes);

  return (
    <div className="bg-white">
      <h3>{requestedUser?.username}</h3>
    </div>
    // <MantineProvider>
    //         <Notifications />
    //     <RouterProvider router={router} />
    // </MantineProvider>
  )
}

export default App