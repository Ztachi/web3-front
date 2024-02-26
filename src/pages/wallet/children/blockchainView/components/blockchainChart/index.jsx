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

// const CANVAS_WIDTH = 2000;
/**
 * @description: 根据索引获取X坐标数值
 * @param {Number} index
 * @param {Number} index
 * @return {*}
 */
// function getX(index, uncleIndex) {

// }

/**
 * @description: 根据输入的原始数据输出echarts需要的数据
 * @param {Array} dataList 原始数据数组
 * @return {Array} echarts数据数组
 */
function transformDataList(dataList) {
  //区块数
  // const length = dataList.length;

  //展开数组
  // const flatList = [];
  return dataList.map((item, index) =>
    Object.assign(item, {
      name: `block-${item.number}`,
      x: (index + 1) * 100,
      y: 300,
    })
  );
}
//有叔叔区块就加上叔叔区块
//   if (item.uncleBlockNumber) {
//     item.uncles.forEach((uncle, i) => {
//       uncle.index = i + 1;
//       uncle.source = index;
//     });
//     //加入到数组
//     flatList.push(...item.uncles);
//     //设置target关系
//     item.target = new Array(item.uncleBlockNumber)
//       .fill()
//       .map((d, i) => index - (item.uncleBlockNumber - i));
//   }
//   //标识一下
//   item.isMainBlock = true;
//   flatList.push(...item);
// });

// return flatList.map((d, i) => {
//   //如果是主要区块
//   if (d.isMainBlock) {
// return Object.assign(d, {
//   name: `block-${d.number}`,
//   x: (i + 1) * 100,
//   y: 300,
// });
//   }
//   //叔叔区块
//   return Object.assign(d, {
//     name: `uncle block-${d.index}`,
//     x: (i + 1) * 100,
//     y: 300,
//   });
// });
// });
// }

/**
 * @description: 根据转换后的数据生成links
 * @param {Array} dataList 转换后的数据数组
 * @return {Array} links数据数组
 */
// function getLinks(dataList) {}

/**
 * @description: 传入原始数据，生成echarts配置
 * @param {Array} dataList 原始数据数组
 * @return {Object} echarts数据
 */
function getOption(dataList) {
  //转换展示数据
  const data = transformDataList(dataList);
  //根据展示数据生成links
  // const links = getLinks(data);
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
        links: [
          {
            source: 3,
            target: 2,
          },
          {
            source: 2,
            target: 1,
          },
          {
            source: 1,
            target: 0,
          },
        ],
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
