import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App2";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortalProvider } from './context/PortalContext';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    {/* <App /> */}
    <PortalProvider>
    <App />
    </PortalProvider>
    </QueryClientProvider>
  </StrictMode>,
)
