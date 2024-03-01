import { useWeb3React } from '@web3-react/core';

import SecondLevelPage from '@/components/layout/secondLevelPage';
import BasicInfo from './components/basicInfo';
import Transaction from './components/transaction';

export const WalletIndex = () => {
  const connector = useWeb3React();
  const { chainId, account, accounts } = connector;
  return (
    <SecondLevelPage noHeader>
      <div className="p-[10px] bg-white rounded-lg grid gap-[20px]">
        <BasicInfo {...{ account, chainId }} />
        <Transaction {...{ account, accounts }} />
      </div>
    </SecondLevelPage>
  );
};

export default WalletIndex;
