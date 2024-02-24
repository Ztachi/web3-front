import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Web3ContextProvider from '@/libs/wallet/components/Web3ContextProvider';
import CommonSuspense from '@/components/layout/commonSuspense';
// import App from '@/App';
import '@/assets/css/global.scss';

import './index.css';
import '@/assets/css/common.scss';

import store from './store';
import router from './router';

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ContextProvider>
        <CommonSuspense>{router}</CommonSuspense>
      </Web3ContextProvider>
    </Provider>
  </React.StrictMode>
);
