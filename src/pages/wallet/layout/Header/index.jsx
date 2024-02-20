import { useState, useEffect, useContext } from 'react';
import { useWeb3React } from '@web3-react/core';
import { List, Card, Typography, Spin } from 'antd';

import { Web3Context } from '@/libs/wallet/components/Web3Provider';

const { Paragraph } = Typography;

/**
 * @description: 基础信息木块
 * @param {Array} data 数据列表
 * @return {ReactNode}
 */
const HeaderBaseInfo = ({ data }) => {
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
   * @param {String} name 数据名
   * @param {String} value 数据值
   * @return {ReactNode}
   */
  function getValueDom(name, value) {
    switch (name) {
      case 'account':
        return (
          <Paragraph className="!mb-0" copyable>
            {getValueTextDom(value)}
          </Paragraph>
        );
      case 'chainId':
        return getValueTextDom(value);
      case 'balance':
        return value ? getValueTextDom(value) : <Spin />;
    }
  }

  return (
    <List
      bordered
      dataSource={data}
      renderItem={({ name, value }) => (
        <List.Item key={name}>
          {name}: {getValueDom(name, value)}
        </List.Item>
      )}
    />
  );
};

const Header = () => {
  const web3 = useContext(Web3Context);
  const connector = useWeb3React();
  const { chainId, account } = connector;
  const [balance, setBalance] = useState(null);

  //基础信息数据
  const basicInfoData = [
    { name: 'account', value: account },
    { name: 'chainId', value: chainId },
    { name: 'balance', value: balance },
  ];

  useEffect(() => {
    web3.eth.getBalance(account).then((b) => {
      const a = web3.utils.fromWei(b, 'ether');
      setBalance(a === '0.' ? 0 : a);
    });
  }, [web3, account, setBalance, chainId]);
  return (
    <div className="grid  grid-flow-col auto-cols-fr gap-[20px] p-[10px]">
      <Card title="Basic information" bordered={false}>
        <HeaderBaseInfo data={basicInfoData} />
      </Card>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </div>
  );
};
export default Header;
