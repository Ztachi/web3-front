/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:00:54
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-22 18:27:25
 * @Description:
 */
// import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Outlet } from 'react-router-dom';

import { Skeleton } from 'antd';

import Web3Provider from '@/libs/wallet/components/Web3Provider';
import useCheckWalletConnection from '@/hooks/useCheckWalletConnection';

import CommonSuspense from '@/components/layout/commonSuspense';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatButtonList from '@/components/floatButtonList';

// import request from '@/api';

const Wallet = () => {
  useCheckWalletConnection();

  const {
    account,
    connector: { provider },
  } = useWeb3React();

  console.log(account, provider);
  if (!account) {
    return <Skeleton active />;
  }
  return (
    <div className="grid grid-rows-[50px_1fr_50px] gap-[10px] text-primary container rounded-lg">
      <Header />

      <Web3Provider provider={provider}>
        <CommonSuspense>
          <Outlet />
        </CommonSuspense>
      </Web3Provider>

      <Footer />

      <FloatButtonList />
    </div>
  );
};

export default Wallet;
