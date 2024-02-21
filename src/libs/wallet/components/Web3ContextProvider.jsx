/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-12 00:05:55
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-21 19:21:25
 * @Description:
 */
import { Web3ReactProvider } from '@web3-react/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchChainList } from '@/store/modules/chain';

import walletList from '../walletList';

const Web3ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // attempt to connect eagerly on mount
  useEffect(() => {
    //获取链列表
    dispatch(fetchChainList());

    walletList.forEach(async ({ connector }) => {
      try {
        if (connector.connectEagerly) {
          await connector.connectEagerly();
        } else {
          await connector.activate();
        }
      } catch {
        console.debug('Failed to connect eagerly to metamask');
      }
    });
  }, [dispatch]);
  return (
    <Web3ReactProvider
      connectors={walletList.map((connector) => [connector.connector, connector.hooks])}
    >
      {children}
    </Web3ReactProvider>
  );
};
export default Web3ContextProvider;
