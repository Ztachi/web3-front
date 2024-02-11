/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-11 21:32:16
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-11 23:59:29
 * @Description: logics of connection
 */

// import { CHAIN_INFO } from './constants';
import walletList, { walletObj } from './walletList';

function getIsBraveWallet() {
  return window.ethereum?.isBraveWallet ?? false;
}

export function getHasMetaMaskExtensionInstalled() {
  return (window.ethereum?.isMetaMask ?? false) && !getIsBraveWallet();
}

export function onConnectionError(error) {
  console.debug(`web3-react error: ${error}`);
}

export function getConnection(c) {
  const connection =
    typeof c === 'string' ? walletObj[c] : walletList.find((wallet) => wallet.connector === c);
  if (!connection) {
    throw Error('Unsupported Connector');
  }
  return connection;
}

// export const switchNetwork = async (chainId, connectionType) => {
//   if (!connectionType) {
//     return;
//   }

//   const { connector } = getConnection(connectionType);

//   if (
//     connectionType === ConnectionType.WALLET_CONNECT ||
//     connectionType === ConnectionType.NETWORK
//   ) {
//     await connector.activate(chainId);
//     return;
//   }

//   const chainInfo = CHAIN_INFO[chainId];
//   const addChainParameter = {
//     chainId,
//     chainName: chainInfo.label,
//     rpcUrls: [chainInfo.rpcUrl],
//     nativeCurrency: chainInfo.nativeCurrency,
//     blockExplorerUrls: [chainInfo.explorer],
//   };
//   await connector.activate(addChainParameter);
// };

export const tryActivateConnector = async (connector) => {
  await connector.activate();
  const connectionType = getConnection(connector).type;
  return connectionType;
};

export const tryDeactivateConnector = async (connector) => {
  await connector.deactivate?.();
  connector.resetState();
  return null;
};
