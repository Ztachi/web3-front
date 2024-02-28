import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Badge, Select } from 'antd';
import { AnimatedCounter } from 'react-animated-counter';

import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import { getChainList } from '@/store/modules/chain';
import { getNewBlock, setNewBlock } from '@/store/modules/block';
import { switchNetwork, getConnection } from '@/libs/wallet/connections';
import { formatBlockInformation } from '@/libs/block';

function filterOption(input, option) {
  return (
    option.chainId === +input || option.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
  );
}

const ChianHandle = () => {
  const dispatch = useDispatch();
  const web3 = useContext(Web3Context);

  const { chainId, connector } = useWeb3React();

  //筛选出来的列表
  const chainList = useSelector(getChainList);
  //最新区块
  const newBlock = useSelector(getNewBlock);
  //

  useEffect(() => {
    //获取最后一个区块
    web3.eth.getBlock('latest').then((d) => {
      dispatch(setNewBlock(formatBlockInformation(d)));
    });

    //订阅区块更新
    async function getSubscribe(fn) {
      const subscribers = await web3.eth.subscribe('newHeads');
      fn(subscribers);
    }

    let subscription = null;
    getSubscribe((sub) => {
      subscription = sub;
      subscription.on('data', (d) => {
        dispatch(setNewBlock(formatBlockInformation(d)));
      });
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [web3, dispatch, chainId]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center mr-[40px] font-bold">
        <div className="mr-[10px] pl-[20px] bg-[url('/block.svg')] bg-[left_center] bg-[length:20px] bg-no-repeat">
          Block Amount:
        </div>
        <AnimatedCounter
          color="orchid"
          fontSize="20px"
          value={newBlock ? newBlock.number : 0}
          decimalPrecision={0}
          includeCommas
        />
      </div>
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
