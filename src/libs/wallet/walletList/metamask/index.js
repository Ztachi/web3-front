/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-11 21:42:14
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-21 22:26:07
 * @Description: connect metamask wallet
 */
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

import { MetaMaskIcon } from '@/icons';
import { onConnectionError as onError } from '@/libs/wallet/connections';

const [web3MetamaskWallet, web3MetamaskWalletHooks] = initializeConnector(
  (actions) => new MetaMask({ actions, onError })
);

export default {
  connector: web3MetamaskWallet,
  hooks: web3MetamaskWalletHooks,
  type: 'MetaMask',
  name: 'MetaMask',
  url: 'https://metamask.io/',
  Icon: MetaMaskIcon,
};
