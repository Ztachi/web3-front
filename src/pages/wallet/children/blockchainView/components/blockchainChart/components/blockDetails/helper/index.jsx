import { Typography, List } from 'antd';
import { formatTimestamp, formatFileSize } from '../../../helper';

const { Paragraph } = Typography;

/**
 * @description: 根据不同类型数据返回不同列表元素
 * @param {String} label 数据显示名
 * @param {String} item 当前项的值
 * @return {ReactNode}
 */
function getListItem(label, item) {
  let children = null;
  switch (label) {
    default:
      children = <Paragraph copyable={{ text: item }}>{item}</Paragraph>;
  }
  return <List.Item>{children}</List.Item>;
}

/**
 * @description: 根据不同类型数据展示不同dom
 * @param {String} label 数据显示名
 * @param {String} value 数据值
 * @param {Object} args 其他的参数
 * @return {ReactNode}
 */
function getValueDom(label, value, args) {
  console.log(args);

  switch (label) {
    case 'Hash':
    case 'Parent Hash':
    case 'Miner':
    case 'Extra Data':
    case 'Receipts Root':
    case 'SHA3 Uncles':
    case 'State Root':
    case 'Transactions Root':
    case 'Logs Bloom':
      return <Paragraph copyable={{ text: value }}>{value}</Paragraph>;
    case 'Transactions':
    case 'Uncles':
      return value?.length ? (
        <List dataSource={value} renderItem={(item) => getListItem(label, item)} />
      ) : (
        ' - '
      );
    default:
      return value || ' - ';
  }
}

function getDomList(dataList) {
  return dataList.map(({ label, value, ...args }) => {
    const item = {
      key: label,
      label,
      ...args,
    };
    item.children = getValueDom(label, value, args);
    return item;
  });
}
/**
 * @description: 生成Descriptions所需的数据
 * @param {Object} data 原数据
 * @return {Object} Descriptions所需的数据
 */
export default function getItems(data) {
  const {
    hash,
    parentHash,
    number,
    difficulty,
    nonce,
    gasLimit,
    gasUsed,
    baseFeePerGas,
    size,
    timestamp,
    totalDifficulty,
    extraData,
    miner,
    receiptsRoot,
    sha3Uncles,
    stateRoot,
    transactionsRoot,
    transactions,
    logsBloom,
    uncles,
  } = data;
  //基础信息数据字段列表
  const dataList = [
    {
      label: 'Hash',
      value: hash,
      span: 3,
      labelStyle: { width: '200px' },
    },
    {
      label: 'Parent Hash',
      value: parentHash,
      span: 3,
    },
    {
      label: 'Number',
      value: number,
    },
    {
      label: 'Difficulty',
      value: difficulty,
    },
    {
      label: 'Nonce',
      value: nonce,
    },
    {
      label: 'Gas Limit',
      value: gasLimit,
    },
    {
      label: 'Gas Used',
      value: gasUsed,
    },
    {
      label: 'Base Fee Per Gas',
      value: baseFeePerGas,
    },
    {
      label: 'Size',
      value: formatFileSize(size),
    },
    {
      label: 'Timestamp',
      value: formatTimestamp(timestamp),
      span: 2,
    },
    {
      label: 'Total Difficulty',
      value: totalDifficulty,
      span: 3,
    },
    {
      label: 'Miner',
      value: miner,
      span: 3,
    },
    {
      label: 'Extra Data',
      value: extraData,
      span: 3,
    },
    {
      label: 'Receipts Root',
      value: receiptsRoot,
      span: 3,
    },

    {
      label: 'State Root',
      value: stateRoot,
      span: 3,
    },
    {
      label: 'Transactions Root',
      value: transactionsRoot,
      span: 3,
    },
    {
      label: 'Transactions',
      value: transactions,
      span: 3,
    },
    {
      label: 'Logs Bloom',
      value: logsBloom,
      span: 3,
    },
    {
      label: 'SHA3 Uncles',
      value: sha3Uncles,
      span: 3,
    },
    {
      label: 'Uncles',
      value: uncles.map((uncle) => uncle.hash),
      span: 3,
    },
  ];

  return getDomList(dataList);
}
