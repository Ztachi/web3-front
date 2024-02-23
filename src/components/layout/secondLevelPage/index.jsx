// import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

/**
 * @description: 二级界面框架
 * @param {ReactNode} children
 * @param {ReactNode} headers 自定义头部内容。默认是返回按钮
 * @param {Object} options
 * @param {Boolean} options.noHeader 是否不需要头部
 * @param {Array}options.containerClassName 添加内容容器的class
 * @param {Object}options.state 添加界面跳转的state
 * @return {ReactNode}
 */
const SecondLevelPage = ({ children, headers, options = {} }) => {
  const { noHeader, containerClassName = [], state = null } = options;
  return (
    <>
      {!noHeader && (
        <div className="absolute top-[10px] left-[20px] right-[20px] h-[40px] flex gap-[20px] items-center">
          {headers || (
            <Link to=".." relative="path" state={state}>
              <Button icon={<ArrowLeftOutlined />}>Back</Button>
            </Link>
          )}
        </div>
      )}

      <div
        className={`absolute ${noHeader ? 'top-[20px]' : 'top-[60px]'} left-[20px] right-0 bottom-[20px] overflow-auto ${containerClassName}`}
      >
        {children}
      </div>
    </>
  );
};

export default SecondLevelPage;
