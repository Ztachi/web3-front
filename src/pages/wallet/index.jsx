/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:00:54
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-21 21:41:33
 * @Description:
 */
// import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Outlet } from 'react-router-dom';

import { Skeleton } from 'antd';

import Web3Provider from '@/libs/wallet/components/Web3Provider';
import useCheckWalletConnection from '@/hooks/useCheckWalletConnection';

import Header from './layout/Header';
import Footer from './layout/Footer';
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
        <Outlet />
      </Web3Provider>

      <Footer />

      <FloatButtonList />
    </div>
  );
};

export default Wallet;
