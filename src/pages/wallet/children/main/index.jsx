import { useWeb3React } from '@web3-react/core';

import BasicInfo from './components/basicInfo';

export const WalletIndex = () => {
  const connector = useWeb3React();
  const { chainId, account } = connector;
  return (
    <div className="p-[10px] bg-white rounded-lg">
      <BasicInfo {...{ account, chainId }} />
    </div>
  );
};

export default WalletIndex;
