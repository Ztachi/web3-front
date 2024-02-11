import { Web3ReactProvider } from '@web3-react/core';

import walletList from '../walletList';

const Web3ContextProvider = ({ children }) => (
  <Web3ReactProvider
    connectors={walletList.map((connector) => [connector.connector, connector.hooks])}
  >
    {children}
  </Web3ReactProvider>
);
export default Web3ContextProvider;
