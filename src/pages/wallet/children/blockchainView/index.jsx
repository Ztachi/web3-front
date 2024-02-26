import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { InputNumber, Spin } from 'antd';

import useGetBlockchainDataList from '@/hooks/useGetBlockchainDataList';
import PageLoading from '@/components/pageLoading';
import SecondLevelPage from '@/components/layout/secondLevelPage';
import BlockchainChart from './components/blockchainChart';

const BlockchainView = () => {
  const connector = useWeb3React();
  const [blockNumber, setBlockNumber] = useState(2518);
  const { account, chainId } = connector;
  const { blockchainDataList, isFetching } = useGetBlockchainDataList(chainId, blockNumber);
  console.log(account, blockchainDataList);

  return (
    <div>
      <SecondLevelPage
        headers={
          <>
            <InputNumber
              min={0}
              max={1000000}
              defaultValue={blockNumber}
              onPressEnter={(e) => {
                setBlockNumber(e.target.value);
              }}
              changeOnWheel
            />
            {isFetching && <Spin />}
          </>
        }
      >
        {blockchainDataList ? <BlockchainChart dataList={blockchainDataList} /> : <PageLoading />}
      </SecondLevelPage>
    </div>
  );
};

export default BlockchainView;
