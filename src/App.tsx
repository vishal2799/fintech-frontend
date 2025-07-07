import { MantineProvider } from "@mantine/core"
import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import { AuthProvider } from "./app/AuthContext";

const router = createBrowserRouter(routes);

const App = () => {

  return (
    <MantineProvider>
      <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </MantineProvider>
  )
}

export default App