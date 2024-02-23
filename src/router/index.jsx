import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import HomePage from '@/pages/homepage';
import Demo from '@/pages/demo';

import Tools from '@/pages/tools';
import ChainSearch from '@/pages/tools/children/chainSearch';
import ChainInformation from '@/pages/tools/children/chainInformation';

import Login from '@/pages/login';
import Wallet from '@/pages/wallet';
import WalletMain from '@/pages/wallet/children/main';
import ErrorElement from '@/pages/error';

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<HomePage />} errorElement={<ErrorElement />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/tools" element={<Tools />}>
      <Route
        shouldRevalidate={({ currentUrl }) => {
          console.log(currentUrl);

          return false;
        }}
        index
        element={<ChainSearch />}
      />
      <Route path=":chainId" element={<ChainInformation />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/wallet" element={<Wallet />}>
      <Route index element={<WalletMain />} />
    </Route>
  </>
);

export default <RouterProvider router={createBrowserRouter(routes)} />;
