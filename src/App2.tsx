import { SuperAdminApp } from './routes/SuperAdminApp';
import TenantApp from './routes/TenantApp';
import { usePortal } from './context/PortalContext';

export default function AppRouter() {
  const { type } = usePortal();

  if (!type) return <div>Invalid or loading portal...</div>;

  return type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />;
}

// // import { useState, useEffect } from 'react';
// import { SuperAdminApp } from './routes/SuperAdminApp';
// import TenantApp from './routes/TenantApp';
// import { usePortal } from './context/PortalContext';
// // import { AppThemeProvider } from './context/AppThemeProvider';
// // import { Stack, RingProgress, Text, Title } from '@mantine/core';
// // import axios from './api/axios';

// export default function AppRouter() {
//   const { type } = usePortal();
//   // const [prewarmValue, setPrewarmValue] = useState(0);
//   // const [status, setStatus] = useState<'starting' | 'ready'>('starting');

//   // useEffect(() => {
//   //   if (!type) return;

//   //   let interval;
//   //   let finished = false;

//   //   // gradually increase percentage every 50ms
//   //   interval = setInterval(() => {
//   //     setPrewarmValue(prev => {
//   //       if (prev >= 95) return prev; // stop at 95% until backend ready
//   //       return prev + 1; // adjust speed by changing increment
//   //     });
//   //   }, 150);

//   //   // poll backend to see if it's ready
//   //   const pollBackend = async () => {
//   //     try {
//   //       const res = await axios('/prewarm');
//   //       if (res.data.status === 'ready') {
//   //         finished = true;
//   //         clearInterval(interval);

//   //         // smoothly animate from current value to 100%
//   //         const step = () => {
//   //           setPrewarmValue(prev => {
//   //             if (prev >= 100) {
//   //               setStatus('ready');
//   //               return 100;
//   //             }
//   //             return prev + 1;
//   //           });
//   //           if (prewarmValue < 100) setTimeout(step, 2); // adjust speed here
//   //         };
//   //         step();
//   //       } else {
//   //         setTimeout(pollBackend, 3000); // retry after 1s
//   //       }
//   //     } catch {
//   //       setTimeout(pollBackend, 3000); // retry on error
//   //     }
//   //   };

//   //   pollBackend();

//   //   return () => clearInterval(interval);
//   // }, [type]);

//   if (!type) return <div>Invalid or loading portal...</div>;

//   // if (status !== 'ready') {
//   //   return (
//   //     <Stack align="center" justify="center" style={{ height: '100vh' }}>
//   //       <RingProgress
//   //         size={140}
//   //         thickness={12}
//   //         roundCaps
//   //         sections={[{ value: prewarmValue, color: 'blue' }]}
//   //         label={<Text size="lg" ta="center">{Math.floor(prewarmValue)}%</Text>}
//   //       />
//   //       <Title order={3} mt="md">
//   //         Waking up your portal...
//   //       </Title>
//   //     </Stack>
//   //   );
//   // }

//   return type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />;
// }



//   if (type === 'superadmin') {
//     return useRoutes([
//       { path: '/super-admin/*', element: <div>Super Admin</div> }
//     ]);
//   }

//   if (type === 'tenant') {
//     return useRoutes([
//       { path: '/tenants/:tenantId/*', element: <div>tenants</div> }
//     ]);
//   }

//   return null;


// import { AppThemeProvider } from "./context/AppThemeProvider";
// import { usePortal } from "./context/PortalContext";
// import SuperAdminApp from "./routes/SuperAdminApp";
// import TenantApp from "./routes/TenantApp";

// import '@mantine/dates/styles.css';
// import '@mantine/notifications/styles.css';

// export default function App() {

//   const portal = usePortal();

//   if (!portal?.type) return <div>Invalid or loading portal...</div>;

//   return (
//         <AppThemeProvider>
//                 {portal.type === 'superadmin' ? <SuperAdminApp /> : <TenantApp />}
//         </AppThemeProvider>
// )
// }
