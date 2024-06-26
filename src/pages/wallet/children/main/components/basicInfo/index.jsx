import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Typography, Spin } from 'antd';

import { Web3Context } from '@/libs/wallet/components/Web3Provider';
import { getCurrentChain } from '@/store/modules/chain';

import { GET_BALANCE_INTERVAL } from '@/const';
import { getBalanceUnits, fixedZeroEth } from '@/helper';

const { Paragraph } = Typography;

/**
 * @description: 基础信息模块
 * @param {String} account 账号
 * @param {String} chainId 链号
 * @return {ReactNode}
 */
const BasicInfo = ({ account, chainId, className }) => {
  const web3 = useContext(Web3Context);

  //当前链信息
  const currentChainInformation = useSelector(getCurrentChain);

  //账户余额
  const [balance, setBalance] = useState('fetching...');

  console.log('currentChainInformation:', currentChainInformation);

  useEffect(() => {
    setBalance('fetching...');
    //获取余额
    web3.eth.getBalance(account).then((b) => {
      const newBalance = web3.utils.fromWei(b, 'ether');
      setBalance(fixedZeroEth(newBalance));
    });

    const interval = setInterval(() => {
      web3.eth.getBalance(account).then((b) => {
        const newBalance = web3.utils.fromWei(b, 'ether');
        setBalance(fixedZeroEth(newBalance));
      });
    }, GET_BALANCE_INTERVAL);
    return () => clearInterval(interval);
  }, [web3, account, setBalance, chainId]);

  /**
   * @description: 数据项的值，通用
   * @param {String} value 值
   * @return {ReactNode}
   */
  function getValueTextDom(value) {
    return <span className="text-lg font-bold color-primary">{value}</span>;
  }
  /**
   * @description: 根据不同类型数据展示不同dom
   * @param {String} label 数据显示名
   * @param {String} value 数据值
   * @param {Object} args 其他的参数
   * @return {ReactNode}
   */
  function getValueDom(label, value, args) {
    switch (label) {
      case 'Account':
        return <Paragraph copyable={{ text: value }}>{getValueTextDom(value)}</Paragraph>;
      case 'Balance':
        return value ? (
          <>
            {getValueTextDom(value)} <b>{args.units}</b>
          </>
        ) : (
          <Spin />
        );
      case 'Chain Name':
      case 'Chain ID':
        return (
          <a className="underline" href={args.url} target="_blank" rel="noreferrer">
            {getValueTextDom(value)}
          </a>
        );
      default:
        return getValueTextDom(value);
    }
  }

  //基础信息数据字段列表
  const dataList = [
    { label: 'Account', value: account, span: 2 },
    { label: 'Balance', value: `${balance}`, units: getBalanceUnits(currentChainInformation) },
    {
      label: 'Chain Name',
      value: currentChainInformation?.name,
      url: currentChainInformation?.infoURL,
    },
    { label: 'Chain ID', value: chainId, url: `/tools/${chainId}` },
    { label: 'Network ID', value: currentChainInformation?.networkId },
  ];

  return (
    <Descriptions
      className={className}
      title="Basic Information"
      bordered
      size="small"
      items={dataList.map(({ label, value, ...args }) => {
        const item = {
          key: label,
          label,
          ...args,
        };
        item.children = getValueDom(label, value, args);
        return item;
      })}
    />
  );
};

export default BasicInfo;
