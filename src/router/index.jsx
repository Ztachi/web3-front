import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/homepage';
import Demo from '@/pages/demo';
import Tools from '@/pages/tools';
import ChainSearch from '@/pages/tools/children/chainSearch';
import Login from '@/pages/login';
import Wallet from '@/pages/wallet';
import WalletMain from '@/pages/wallet/children/main';
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
    element: <Tools />,
    children: [
      {
        path: '/tools',
        element: <ChainSearch />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Wallet />,
    children: [{ path: '/wallet', element: <WalletMain /> }],
  },
];

export default <RouterProvider router={createBrowserRouter(routes)} />;
