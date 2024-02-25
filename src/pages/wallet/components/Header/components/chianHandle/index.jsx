import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Badge, Select } from 'antd';

// import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import { getChainList } from '@/store/modules/chain';
import { switchNetwork, getConnection } from '@/libs/wallet/connections';

function filterOption(input, option) {
  return (
    option.chainId === +input || option.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
  );
}

const ChianHandle = () => {
  const { chainId, connector } = useWeb3React();

  // const [keywords, setKeywords] = useState('');

  //筛选出来的列表
  const chainList = useSelector(getChainList);

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
            chainList.find(({ chainId: id }) => id === +v),
            getConnection(connector)
          );
        }}
        filterOption={filterOption}
        options={chainList}
        fieldNames={{ label: 'name', value: 'chainId' }}
        value={chainId}
      />
    </div>
  );
};

export default ChianHandle;
