import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import App from '@/App';
import '@/assets/css/global.scss';

import './index.css';
import '@/assets/css/common.scss';

import store from './store';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>{router}</Provider>
  </React.StrictMode>
);
