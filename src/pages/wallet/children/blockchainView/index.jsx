import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { List, InputNumber } from 'antd';

import useGetBlockchainDataList from '@/hooks/useGetBlockchainDataList';
import PageLoading from '@/components/pageLoading';

const BlockchainView = () => {
  const connector = useWeb3React();
  const [blockNumber, setBlockNumber] = useState(2518);
  const { account } = connector;
  const blockchainDataList = useGetBlockchainDataList(blockNumber);
  console.log(account, blockchainDataList);

  if (!blockchainDataList) {
    return <PageLoading />;
  }

  return (
    <div>
      <InputNumber
        min={0}
        max={1000000}
        defaultValue={blockNumber}
        onPressEnter={(e) => {
          setBlockNumber(e.target.value);
        }}
        changeOnWheel
      />
      <List
        size="large"
        header={`block Data(${blockNumber - 2} - ${blockNumber}):`}
        bordered
        dataSource={blockchainDataList}
        renderItem={(item) => <List.Item>{JSON.stringify(item)}</List.Item>}
      />
    </div>
  );
};

export default BlockchainView;
