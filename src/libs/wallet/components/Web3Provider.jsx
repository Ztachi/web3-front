/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-18 23:37:38
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-20 00:43:56
 * @Description:
 */
import Web3 from 'web3';
import { createContext, useRef } from 'react';

export const Web3Context = createContext(null);

const Web3Provider = ({ children, provider }) => {
  const web3 = useRef(new Web3(provider));
  return <Web3Context.Provider value={web3.current}>{children}</Web3Context.Provider>;
};

export default Web3Provider;
