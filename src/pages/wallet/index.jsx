/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:00:54
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-01 11:26:16
 * @Description:
 */
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Skeleton } from 'antd';

import Web3Provider from '@/libs/wallet/components/Web3Provider';
import useCheckWalletConnection from '@/hooks/useCheckWalletConnection';
import { setCurrentChain } from '@/store/modules/chain';

import CommonSuspense from '@/components/layout/commonSuspense';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatButtonList from '@/components/floatButtonList';
// import request from '@/api';

const Wallet = () => {
  useCheckWalletConnection();
  const dispatch = useDispatch();

  const {
    account,
    chainId,
    connector: { provider },
  } = useWeb3React();

  console.log(account, provider);

  useEffect(() => {
    //刚登陆进来设置当前链
    if (chainId) {
      dispatch(setCurrentChain(chainId));
    }
  }, [dispatch, chainId]);

  if (!account) {
    return <Skeleton active />;
  }
  return (
    <div
      id="wallet-container"
      className="grid grid-rows-[50px_1fr_50px] gap-[10px] text-primary container rounded-lg"
    >
      <Web3Provider provider={provider}>
        <Header className="shadow-2xl" />

        <CommonSuspense>
          <div className="relative bg-white rounded-lg shadow-lg">
            <Outlet />
          </div>
        </CommonSuspense>
      </Web3Provider>

      <Footer className="shadow-2xl" />

      <FloatButtonList />
    </div>
  );
};

export default Wallet;
