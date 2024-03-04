/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-28 11:23:02
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-03 13:45:10
 * @Description:对区块链绘制的配置
 */
import { formatFileSize, formatTimestamp } from '@/helper';

//区块与区块间的间隙
const BLOCK_GAP = 50;
//区块链Y轴中心
const ORIGINAL_Y = 50;
//叔叔区块相对主链在Y轴的偏移
const UNCLE_OFFSET = 50;
//tooltip展示的字段
const TOOLTIP_FIELD_LIST = [
  {
    name: 'Hash',
    value: 'hash',
  },
  {
    name: 'Miner',
    value: 'miner',
  },
  {
    name: 'Size',
    value: 'size',
    formatter(size) {
      return formatFileSize(size);
    },
  },
  {
    name: 'Gas Limit',
    value: 'gasLimit',
  },
  {
    name: 'Gas Used',
    value: 'gasUsed',
  },
  {
    name: 'Timestamp',
    value: 'timestamp',
    formatter: (data) => formatTimestamp(data),
  },
];

/**
 * @description: 获取叔叔区块名称
 * @param {Number} index 叔叔区块索引
 * @param {Number} number 叔叔区块号
 * @param {Number} whose 谁的叔叔区块
 * @return {String}叔叔区块名称
 */
function getUncleName({ index, number, whose }) {
  return `[${number} ← ${whose}] uncle block-${index}`;
}
/**
 * @description: 根据索引获取叔叔区块坐标数值
 * @param {Number} index 当前区块索引
 * @param {Number} uncleIndex 当前区块所对应的叔叔区块索引
 * @return {Object}x横坐标 y纵坐标
 */
function getUncleCoord(index, uncleIndex) {
  //叔叔区块偶数在下面奇数在上面
  const y = uncleIndex % 2 === 0 ? ORIGINAL_Y + UNCLE_OFFSET : ORIGINAL_Y - UNCLE_OFFSET;
  //横坐标为当前区块位置从上往下从左往右依次排列
  //         最左边的不往左再移一位
  const x = (index - (index < 1 ? 0 : uncleIndex)) * BLOCK_GAP;
  return {
    x,
    y,
  };
}

/**
 * @description: 根据输入的原始数据输出echarts需要的数据
 * @param {Array} dataList 原始数据数组
 * @return {Array} echarts数据数组
 */
function transformDataList(dataList) {
  //区块数
  // const length = dataList.length;

  //展开数组
  const flatList = [];

  dataList.forEach((item, index) => {
    if (index === 0) {
      item.isFirst = true;
    }
    //有叔叔区块就加上叔叔区块
    if (item.uncleBlockNumber) {
      item.uncles.forEach((uncle, i) => {
        //处于叔叔区块集合中的第几个
        uncle.index = i + 1;
        //叔叔区块距离主区块的数值
        // uncle.rise = item.uncleBlockNumber - i - 1;
        //谁的叔叔区块
        uncle.whose = item.number;
      });
      //加入到数组
      flatList.push(...item.uncles);
    }
    //标识一下主区块
    item.isMainBlock = true;
    flatList.push(item);
  });

  return flatList.map((d, i) => {
    //如果是主要区块
    if (d.isMainBlock) {
      return Object.assign(d, {
        name: `block-${d.number}`,
        x: (d.isFirst ? i : i - d.uncleBlockNumber) * BLOCK_GAP,
        y: ORIGINAL_Y,
      });
    }
    //叔叔区块
    return Object.assign(
      d,
      {
        value: +d.number,
        name: getUncleName(d),
        blockName: `block-${d.number}`,
      },
      getUncleCoord(i, d.index)
    );
  });
}

/**
 * @description: 根据转换后的数据生成links
 * @param {Array} dataList 转换后的数据数组
 * @return {Array} links数据数组
 */
function getLinks(dataList) {
  const links = [];
  dataList.forEach((data) => {
    const { blockName, name, number, uncleBlockNumber, uncles } = data;
    if (blockName) {
      links.push({ source: name, target: blockName });
    } else {
      links.push({ source: name, target: `block-${number - 1}` });
      //有叔叔区块还要指向叔叔区块
      if (uncleBlockNumber) {
        uncles.forEach((uncle) => {
          links.push({ source: name, target: getUncleName(uncle) });
        });
      }
    }
  });
  return links;
}

/**
 * @description: 传入原始数据，生成echarts配置
 * @param {Array} dataList 原始数据数组
 * @return {Object} echarts数据
 */
export default function getOption(dataList) {
  //转换展示数据
  const data = transformDataList(dataList);
  //根据展示数据生成links
  const links = getLinks(data);
  console.log(data, links);
  const container = document.querySelector('#wallet-container');
  return {
    width: (dataList.length * container.offsetWidth) / 4,
    title: {
      text: 'Blockchain',
    },
    tooltip: {
      formatter({ data: currentData, dataType }) {
        if (dataType === 'edge') {
          return `<b>${currentData.source}</b> ——> <b>${currentData.target}</b>`;
        }
        return TOOLTIP_FIELD_LIST.map(
          ({ name, value, formatter }) =>
            `<b>${name}:</b> ${formatter ? formatter(currentData[value]) : currentData[value]}`
        ).join('<br/>');
      },
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    roam: true,
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbol: 'image:///block.svg',
        symbolSize: 120,
        roam: true,
        label: {
          show: true,
          fontSize: 18,
          position: 'bottom',
          fontWeight: 'bolder',
          textBorderColor: '#1677ff',
          textBorderWidth: 1,
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 18,
        },
        data,
        links,
        // itemStyle: { color: 'red' },
        lineStyle: {
          color: {
            type: 'linear',
            colorStops: [
              {
                offset: 0,
                color: '#4828ff', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#cc3bff', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          opacity: 0.9,
          width: 2,
        },
      },
    ],
  };
}
