import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

// import HomePage from '@/pages/homepage';

// import Demo from '@/pages/demo';
// import Tools from '@/pages/tools';
// import ChainSearch from '@/pages/tools/children/chainSearch';
// import ChainInformation from '@/pages/tools/children/chainInformation';

// import Login from '@/pages/login';
// import Wallet from '@/pages/wallet';
// import WalletMain from '@/pages/wallet/children/main';

// import ErrorElement from '@/pages/error';

const HomePage = lazy(() => import('@/pages/homepage'));
const Demo = lazy(() => import('@/pages/demo'));
const Tools = lazy(() => import('@/pages/tools'));
const ChainSearch = lazy(() => import('@/pages/tools/children/chainSearch'));
const ChainInformation = lazy(() => import('@/pages/tools/children/chainInformation'));
const Login = lazy(() => import('@/pages/login'));
const Wallet = lazy(() => import('@/pages/wallet'));
const WalletMain = lazy(() => import('@/pages/wallet/children/main'));
const BlockchainView = lazy(() => import('@/pages/wallet/children/blockchainView'));
const Interact = lazy(() => import('@/pages/wallet/children/interact'));

const ErrorElement = lazy(() => import('@/pages/error'));

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<HomePage />} errorElement={<ErrorElement />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/tools" element={<Tools />}>
      <Route index element={<ChainSearch />} />
      <Route path=":chainId" element={<ChainInformation />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/wallet" element={<Wallet />}>
      <Route index element={<WalletMain />} />
      <Route path="blockchainView" element={<BlockchainView />} />
      <Route path="interact" element={<Interact />} />
    </Route>
  </>
);

export default <RouterProvider router={createBrowserRouter(routes)} />;
