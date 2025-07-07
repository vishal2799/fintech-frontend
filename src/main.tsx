import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Button } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MantineProvider>
<div className="bg-amber-300 p-5"><Button className="bg-red-500 text-white">Hello</Button></div>
</MantineProvider>
    ),
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
