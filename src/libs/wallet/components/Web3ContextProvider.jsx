/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-12 00:05:55
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-18 22:53:49
 * @Description:
 */
import { Web3ReactProvider } from '@web3-react/core';
import { useEffect } from 'react';

import walletList from '../walletList';

const Web3ContextProvider = ({ children }) => {
  // attempt to connect eagerly on mount
  useEffect(() => {
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
  }, []);
  return (
    <Web3ReactProvider
      connectors={walletList.map((connector) => [connector.connector, connector.hooks])}
    >
      {children}
    </Web3ReactProvider>
  );
};
export default Web3ContextProvider;
