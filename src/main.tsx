import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { Toaster } from 'react-hot-toast';
import { trpc } from './utils/trpc';

import Index from './pages';
import Search from './pages/search';
import User from './pages/user';

import './fonts.css';
import './index.css';
import RootComponent from './components/layout/RootComponent';

const router = createBrowserRouter([
  {
    element: <RootComponent />,
    children: [
      { path: '/', element: <Index />, index: true },
      { path: '/search', element: <Search /> },
      { path: '/user/:username', element: <User /> },
    ],
  },
]);

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: '/trpc' })],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AnimatePresence mode='wait'>
    <App />
  </AnimatePresence>,
);
