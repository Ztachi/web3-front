// import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

/**
 * @description: 二级界面框架
 * @param {ReactNode} children
 * @param {ReactNode} headers 自定义头部内容。默认是返回按钮
 * @param {Boolean} noHeader 是否不需要头部
 * @param {Object} options
 * @param {Array}options.containerClassName 添加内容容器的class
 * @param {Object}options.state 添加界面跳转的state
 * @return {ReactNode}
 */
const SecondLevelPage = ({ children, noHeader = false, headers, options = {} }) => {
  const navigate = useNavigate();
  const { containerClassName = [], state = null } = options;
  return (
    <>
      {!noHeader && (
        <div className="absolute top-[10px] left-[20px] right-[20px] flex gap-[20px] items-center">
          {headers || (
            <Button
              onClick={() =>
                navigate(window.history.state.idx === 0 ? '..' : -1, state && { state })
              }
              icon={<ArrowLeftOutlined />}
            >
              Back
            </Button>
          )}
        </div>
      )}

      <div
        className={`absolute ${noHeader ? 'top-[20px]' : 'top-[60px]'} left-[20px] right-[20px] bottom-[20px] overflow-auto ${containerClassName}`}
      >
        {children}
      </div>
    </>
  );
};

export default SecondLevelPage;
