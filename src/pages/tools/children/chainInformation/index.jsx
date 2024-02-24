import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { capitalize } from 'lodash-es';

import { Descriptions, Typography, Skeleton, Button, List } from 'antd';

import { getChainById } from '@/store/modules/chain';

import SecondLevelPage from '@/components/layout/secondLevelPage';

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
    case 'RPC':
      children = <Paragraph copyable={{ text: item }}>{item}</Paragraph>;
      break;
    default:
      children = (
        <Button className="pl-0" type="link" href={item} target="_blank" rel="noreferrer">
          {item}
        </Button>
      );
  }
  return <List.Item>{children}</List.Item>;
}

/**
 * @description: 获取生成的explorer列表
 * @param {Object} item 当前数据
 * @return {ReactNode}
 */
function getExplorers(item) {
  const dataList = [];
  item.forEach((d) => {
    dataList.push({
      key: 'Name',
      label: 'Name',
      span: 2,
      children: (
        <Button className="pl-0" type="link" href={d.url} target="_blank" rel="noreferrer">
          {d.name}
        </Button>
      ),
    });
    dataList.push({
      key: 'Standard',
      label: 'Standard',
      children: d.standard,
    });
  });

  return dataList;
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
    case 'Chain Name':
      return (
        <Button className="pl-0" type="link" href={args.url} target="_blank" rel="noreferrer">
          {value}
        </Button>
      );
    case 'Faucets':
    case 'RPC':
      return value.length ? (
        <List dataSource={value} renderItem={(item) => getListItem(label, item)} />
      ) : (
        ' - '
      );

    case 'Explorers':
      return value?.length ? <Descriptions bordered items={getExplorers(value)} /> : ' - ';
    case 'Native Currency':
      return (
        <Descriptions
          bordered
          items={Object.entries(value).map(([k, v]) => ({
            key: k,
            label: capitalize(k),
            children: v,
          }))}
        />
      );
    default:
      return value;
  }
}

const ChainInformation = () => {
  const { chainId } = useParams();
  //当前链信息
  const currentChainInformation = useSelector((state) => getChainById(state, +chainId));
  console.log(currentChainInformation);

  //没获取到就返回骨架屏
  if (!currentChainInformation) {
    return (
      <SecondLevelPage>
        <Skeleton />
      </SecondLevelPage>
    );
  }

  const {
    name,
    infoURL,
    shortName,
    chain,
    networkId,
    faucets,
    rpc,
    nativeCurrency,
    explorers,
    icon,
  } = currentChainInformation;
  //基础信息数据字段列表
  const dataList = [
    {
      label: 'Chain Name',
      value: name,
      url: infoURL,
      span: 2,
    },
    { label: 'Short Name', value: shortName },
    { label: 'Chain', value: chain },
    { label: 'Chain ID', value: chainId },
    { label: 'Network ID', value: networkId },
    { label: 'Native Currency', value: nativeCurrency, span: 3 },
    { label: 'Explorers', value: explorers, span: 3 },
    { label: 'Faucets', value: faucets, span: 3 },
    { label: 'RPC', value: rpc, span: 3 },
  ];

  return (
    <SecondLevelPage>
      <Descriptions
        title={
          <div>
            Chain Information{' '}
            {icon && (
              <i
                className="inline-block size-[20px] bg-center bg-cover relative top-[5px] left-[10px]"
                style={{
                  backgroundImage: `url("https://icons.llamao.fi/icons/chains/rsz_${icon}.jpg")`,
                }}
              />
            )}
          </div>
        }
        bordered
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
    </SecondLevelPage>
  );
};

export default ChainInformation;
