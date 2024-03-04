import { useWeb3React } from '@web3-react/core';

import SecondLevelPage from '@/components/layout/secondLevelPage';
import BasicInfo from './components/basicInfo';
import Transaction from './components/transaction';

import style from './index.module.scss';

export const WalletIndex = () => {
  const connector = useWeb3React();
  const { chainId, account, accounts } = connector;
  return (
    <SecondLevelPage noHeader>
      <div id={style['wallet-main']} className="p-[10px] bg-white rounded-lg">
        <BasicInfo className="basic-info-section" {...{ account, chainId }} />
        <Transaction className="transaction-section" {...{ account, accounts }} />
      </div>
    </SecondLevelPage>
  );
};

export default WalletIndex;
