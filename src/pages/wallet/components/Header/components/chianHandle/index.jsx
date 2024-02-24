import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Badge, Select } from 'antd';

// import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import { getChainByNameOrChain } from '@/store/modules/chain';
import { switchNetwork, getConnection } from '@/libs/wallet/connections';

const ChianHandle = () => {
  const { chainId, connector } = useWeb3React();

  const [keywords, setKeywords] = useState('');

  //筛选出来的列表
  const filterList = useSelector((state) => getChainByNameOrChain(state, keywords));

  //当前链信息
  // const currentChainInformation = useSelector(getCurrentChain);

  return (
    <div>
      <Badge className="mr-[10px] scale-150" status="processing" />
      <Select
        popupMatchSelectWidth={false}
        variant="borderless"
        showSearch
        placeholder="Select a chain"
        onChange={(v) => {
          switchNetwork(
            filterList.find(({ chainId: id }) => id === +v),
            getConnection(connector)
          );
        }}
        onSearch={setKeywords}
        options={filterList}
        fieldNames={{ label: 'name', value: 'chainId' }}
        value={chainId}
      />
    </div>
  );
};

export default ChianHandle;
