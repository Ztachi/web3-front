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

import { Empty } from 'antd';

import getOption from './helper';

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

const BlockchainChart = ({ dataList, isFetching }) => {
  const echartsDom = useRef(null);
  const myChart = useRef(null);

  const option = useMemo(() => getOption(dataList), [dataList]);

  //退出销毁
  useEffect(() => {
    let ignore = true;
    if (!myChart.current) {
      ignore = false;
    }
    return () => {
      if (ignore) {
        myChart.current.dispose();
      }
    };
  }, []);

  //loading展示
  useEffect(() => {
    if (myChart.current) {
      myChart.current[isFetching ? 'showLoading' : 'hideLoading']();
    }
  }, [isFetching]);

  //配置项改变重新绘制
  useEffect(() => {
    if (!myChart.current) {
      myChart.current = echarts.init(echartsDom.current);
    }
    myChart.current.setOption(option);
  }, [echartsDom, option]);

  return (
    <div className="h-full relative" ref={echartsDom}>
      {!dataList.length && (
        <div className="h-full absolute top-0 w-full flex justify-center items-center">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default BlockchainChart;
