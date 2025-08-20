import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App2";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PortalProvider } from './context/PortalContext';
import { AppThemeProvider } from './context/AppThemeProvider';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <PortalProvider>      
    <AppThemeProvider>
    <App />
    </AppThemeProvider>
    </PortalProvider>
    </QueryClientProvider>
  </StrictMode>,
)
