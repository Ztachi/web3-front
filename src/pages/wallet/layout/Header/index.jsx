import { useState, useEffect, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Web3Context } from '@/libs/wallet/components/Web3Provider';

const Header = () => {
  const web3 = useContext(Web3Context);
  const connector = useWeb3React();
  const { chainId, account } = connector;
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    web3.eth.getBalance(account).then((b) => {
      const a = web3.utils.fromWei(b, 'ether');
      setBalance(a === '0.' ? 0 : a);
    });
  }, [web3, account, setBalance]);
  return (
    <div>
      account:
      {account} chainId:
      {chainId} balance:
      {balance}
    </div>
  );
};
export default Header;
