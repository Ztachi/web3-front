import { useState } from 'react';
import { Skeleton, Button, List, Descriptions, Drawer } from 'antd';

import { formatTimestamp, fixedZeroEth } from '@/helper';

/**
 * @description: 格式化交易日志数据
 * @param {Object} data 日志数据
 * @param {Function} fromWei wei转换成以太单位
 * @return {ReactNode}
 */
function formatTransactionLog(data, fromWei, units = '') {
  if (!data) return null;
  return {
    category: data.category,
    amount: (
      <>
        <b>{fixedZeroEth(fromWei(data.value, 'ether'))}</b>{' '}
        {units && <span className="ml-[5px]">{units}</span>}
      </>
    ),
    date: formatTimestamp(data.timestamp.toString()),
  };
}

function renderTransactionLog(data, fromWei, units) {
  const log = formatTransactionLog(data, fromWei, units);
  return (
    <Descriptions
      items={Object.entries(log).map(([key, value]) => ({
        key,
        label: key,
        children: value,
        span: 3,
      }))}
    />
  );
}
/**
 * @description: 获取展示信息列表数组
 * @param {Object} userInfo 用户数据
 * @param {String} account 当前账号
 * @param {String} units 单位
 * @param {Function} fromWei wei转换成以太单位
 * @param {Function} setIsShowLogs 设置是否展示更多日志
 * @param {Boolean} isList 是否在列表中展示
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {Array}
 */
function getItems(userInfo, account, units, fromWei, setIsShowLogs, isList, getExplorerDom) {
  if (!userInfo) return [];
  const lastLog = formatTransactionLog(userInfo.transactionLog.at(-1), fromWei);
  const balance = fromWei(userInfo.balance, 'ether');
  const arr = [
    {
      key: 'Balance',
      label: 'Balance',
      children: (
        <>
          <b className="pr-[5px]">{fixedZeroEth(balance)}</b> {units}
        </>
      ),
      span: 3,
    },
    {
      key: 'The last transaction',
      label: 'The last transaction',
      children: lastLog ? (
        <>
          [<b>{lastLog.category}</b>] - [<b>{lastLog.amount}</b>] - [<b>{lastLog.date}</b>]
          <Button type="link" size="small" onClick={setIsShowLogs}>
            show more
          </Button>
        </>
      ) : (
        ' - '
      ),
    },
  ];
  if (!isList) {
    arr.unshift({
      key: 'Account',
      label: 'Account',
      children: getExplorerDom({ value: account }),
      span: 3,
    });
  }
  return arr;
}

/**
 * @description: 展示用户信息
 * @param {Object} data 用户数据
 * @param {String} account 当前账号
 * @param {String} units 单位
 * @param {Function} fromWei wei转换成以太单位
 * @param {Boolean} isList 是否在列表中展示
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {ReactNode}
 */
const UserInfo = ({ data, account, units, fromWei, isList, getExplorerDom }) => {
  //展示日志数据
  const [isShowLogs, setIsShowLogs] = useState(false);
  //展示项
  const items = getItems(data, account, units, fromWei, setIsShowLogs, isList, getExplorerDom);
  if (!data) return <Skeleton active />;
  return (
    <>
      <Descriptions title="User Info" items={items} />
      <Drawer
        title="Transaction logs"
        width="30%"
        onClose={() => setIsShowLogs(false)}
        open={isShowLogs}
      >
        <List
          size="small"
          bordered
          dataSource={data.transactionLog}
          renderItem={(item) => <List.Item>{renderTransactionLog(item, fromWei, units)}</List.Item>}
        />
      </Drawer>
    </>
  );
};

export default UserInfo;
