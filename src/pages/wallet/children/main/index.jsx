import { useWeb3React } from '@web3-react/core';

import SecondLevelPage from '@/components/layout/secondLevelPage';
import BasicInfo from './components/basicInfo';

export const WalletIndex = () => {
  const connector = useWeb3React();
  const { chainId, account } = connector;
  return (
    <SecondLevelPage noHeader>
      <div className="p-[10px] bg-white rounded-lg">
        <BasicInfo {...{ account, chainId }} />
      </div>
    </SecondLevelPage>
  );
};

export default WalletIndex;
