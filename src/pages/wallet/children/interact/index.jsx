import { useContext, useRef, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';

import { Web3Context } from '@/libs/wallet/components/Web3Provider';
import { getCurrentChain } from '@/store/modules/chain';

import SecondLevelPage from '@/components/layout/secondLevelPage';

import { Empty, message, Typography } from 'antd';

import Contract1 from './components/contract1';
import Contract2 from './components/contract2';
import Contract3 from './components/contract3';

import { CONTRACT_ADDRESS_LIST, ABI_GATHER } from '@/const';

import style from './index.module.scss';

const availableChainIds = [
  ...new Set(CONTRACT_ADDRESS_LIST.map((d) => d.map((dd) => dd.chainId)).flat()),
];

const components = [
  (props) => <Contract1 {...props} />,
  (props) => <Contract2 {...props} />,
  (props) => <Contract3 {...props} />,
];

const Interact = () => {
  const chain = useSelector(getCurrentChain);
  const web3 = useContext(Web3Context);
  const { utils } = web3;
  const connector = useWeb3React();
  const { account, chainId } = connector;

  //能使用的智能合约列表
  const availableContracts = useRef([]);

  //获取浏览器链接
  const getExplorerDom = useCallback(
    ({ value, type = 'address' }) => {
      //是否能跳转浏览
      const explorer = chain?.explorers && chain.explorers[0].url;
      return explorer ? (
        <Typography.Paragraph copyable={{ text: value }}>
          <a href={`${explorer}/${type}/${value}`} rel="noreferrer" target="_blank">
            {value}
          </a>
        </Typography.Paragraph>
      ) : (
        <Typography.Paragraph copyable={{ text: value }}>{value}</Typography.Paragraph>
      );
    },
    [chain]
  );

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
        className={`gap-[20px] h-full ${hasData ? style['contract-comment-section'] : 'flex justify-center items-center'}`}
      >
        {hasData ? (
          availableContracts.current.map(({ address, index }) =>
            components[index]({
              key: address,
              className: `contract-${index + 1}`,
              address,
              utils,
              account,
              getExplorerDom,
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
