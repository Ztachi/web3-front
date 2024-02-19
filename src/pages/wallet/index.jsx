/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:00:54
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-19 21:59:44
 * @Description:
 */
// import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Skeleton } from 'antd';

import FloatButtonList from '@/components/floatButtonList';
import Web3Provider from '@/libs/wallet/components/Web3Provider';
import useCheckWalletConnection from '@/hooks/useCheckWalletConnection';
import Header from './layout/Header';

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
    <div className="text-primary">
      {account && (
        <Web3Provider provider={provider}>
          <Header />
        </Web3Provider>
      )}
      <FloatButtonList />
    </div>
  );
};

export default Wallet;
