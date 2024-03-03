import { useContext, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import SecondLevelPage from '@/components/layout/secondLevelPage';

import { Empty, message } from 'antd';

import Contract1 from './components/contract1';

import { CONTRACT_ADDRESS_LIST, ABI_GATHER } from '@/const';

const availableChainIds = CONTRACT_ADDRESS_LIST.map((d) => d.map((dd) => dd.chainId)).flat();

const components = [(props) => <Contract1 {...props} />];

const Interact = () => {
  const web3 = useContext(Web3Context);
  const connector = useWeb3React();
  const { account, chainId } = connector;

  //能使用的智能合约列表
  const availableContracts = useRef([]);

  availableContracts.current = [];

  //筛选出当前链上部署了的
  CONTRACT_ADDRESS_LIST.forEach((contractChains, i) => {
    const published = contractChains.find((item) => item.chainId === chainId);
    if (published) {
      availableContracts.current.push({ index: i, address: published.address });
    }
  });

  //有没有数据
  const hasData = availableContracts.current.length > 0;

  return (
    <SecondLevelPage noHeader>
      <div
        className={`flex flex-wrap gap-[20px] ${!hasData && 'h-full justify-center items-center'}`}
      >
        {hasData ? (
          availableContracts.current.map(({ address, index }) =>
            components[index]({
              key: address,
              className: 'w-1/2',
              address,
              contract: new web3.eth.Contract(
                ABI_GATHER.find((item) => item.addressList.includes(address)).abi,
                address,
                { from: account }
              ),
              onMessage: (msg, type = 'success') => message[type](msg),
            })
          )
        ) : (
          <Empty
            description={
              <div>
                No Data!
                <br />
                Contains the chainIds of the smart contract:
                <div>
                  <b>{availableChainIds.join('、')}</b>
                </div>
              </div>
            }
          />
        )}
      </div>
    </SecondLevelPage>
  );
};

export default Interact;
