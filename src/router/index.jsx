import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/homepage';
import Demo from '@/pages/demo';
import Login from '@/pages/login';
import Wallet from '@/pages/wallet';
import ErrorElement from '@/pages/error';

const routes = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Wallet />,
  },
];

export default <RouterProvider router={createBrowserRouter(routes)} />;
