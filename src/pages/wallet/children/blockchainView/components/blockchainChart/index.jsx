// import { useState, useEffect } from 'react';

import { useRef, useEffect, useMemo } from 'react';
import * as echarts from 'echarts/core';
import { GraphChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  // GridComponent,
  // DatasetComponent,
  TransformComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  // GridComponent,
  // DatasetComponent,
  TransformComponent,
  GraphChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const BLOCK_GAP = 50;
/**
 * @description: 根据索引获取叔叔区块坐标数值
 * @param {Number} index 当前区块索引
 * @param {Number} uncleIndex 当前区块所对应的叔叔区块索引
 * @return {Object}x横坐标 y纵坐标
 */
function getUncleCoord(index, uncleIndex) {
  //偶数在下面奇数在上面
  const y = uncleIndex % 2 === 0 ? 150 : 50;
  //横坐标为当前区块位置从上往下从左往右依次排列
  //         向右一格
  const x = (index * BLOCK_GAP) / 1.5;
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
        uncle.rise = item.uncleBlockNumber - i - 1;
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
        y: 100,
      });
    }
    //叔叔区块
    return Object.assign(
      d,
      {
        name: `uncle block-${d.index}(${d.number})`,
        blockName: `block-${d.number}`,
      },
      getUncleCoord(i - d.rise, d.index)
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
          links.push({ source: name, target: `uncle block-${uncle.index}(${uncle.number})` });
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
function getOption(dataList) {
  //转换展示数据
  const data = transformDataList(dataList);
  //根据展示数据生成links
  const links = getLinks(data);
  console.log(data, links);

  return {
    title: {
      text: 'Basic Graph',
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 100,
        roam: true,
        label: {
          show: true,
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20,
        },
        data,
        links,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
        },
      },
    ],
  };
}

const BlockchainChart = ({ dataList }) => {
  const echartsDom = useRef(null);

  const option = useMemo(() => getOption(dataList), [dataList]);

  useEffect(() => {
    const myChart = echarts.init(echartsDom.current);
    myChart.setOption(option);
  }, [echartsDom, option]);
  return (
    <div className="h-full" ref={echartsDom}>
      13
    </div>
  );
};

export default BlockchainChart;
