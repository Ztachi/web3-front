import { Typography, List, Collapse, Button } from 'antd';

import { formatTimestamp, formatFileSize } from '@/helper';

const { Paragraph } = Typography;

/**
 * @description: 根据不同类型数据返回不同列表元素
 * @param {String} label 数据显示名
 * @param {String} item 当前项的值
 * @return {ReactNode}
 */
function getListItem(label, item, explorer, type = 'block') {
  let children = null;
  switch (label) {
    default:
      children = explorer ? (
        <Paragraph copyable={{ text: item }}>
          <Button className="pl-0" type="link" href={`${explorer}/${type}/${item}`} target="_blank">
            {item}
          </Button>
        </Paragraph>
      ) : (
        <Paragraph copyable={{ text: item }}>{item}</Paragraph>
      );
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
  //是否能跳转浏览
  const explorer = args.chain?.explorers && args.chain.explorers[0].url;
  //跳转类型 address账户地址  block区块  tx交易
  const type = args.type || 'block';
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
      return explorer ? (
        <Paragraph copyable={{ text: value }}>
          <Button
            className="pl-0"
            type="link"
            href={`${explorer}/${type}/${value}`}
            target="_blank"
          >
            {value}
          </Button>
        </Paragraph>
      ) : (
        <Paragraph copyable={{ text: value }}>{value}</Paragraph>
      );
    case 'Transactions':
      return value?.length ? (
        <Collapse
          items={[
            {
              key: '1',
              label: 'Transactions List',
              children: (
                <List
                  dataSource={value}
                  renderItem={(item) => getListItem(label, item, explorer, type)}
                />
              ),
            },
          ]}
        />
      ) : (
        ' - '
      );
    case 'Uncles':
      return value?.length ? (
        <List dataSource={value} renderItem={(item) => getListItem(label, item, explorer, type)} />
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
export default function getItems(data, chain) {
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
      chain,
    },
    {
      label: 'Parent Hash',
      value: parentHash,
      span: 3,
      chain,
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
      chain,
      type: 'address',
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
      chain,
      type: 'tx',
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
      chain,
      type: 'uncle',
    },
  ];

  return getDomList(dataList);
}
