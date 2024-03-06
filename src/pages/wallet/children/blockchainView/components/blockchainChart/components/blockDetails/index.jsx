import { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Drawer, Descriptions, FloatButton } from 'antd';

import { getCurrentChain } from '@/store/modules/chain';

import getItems from './helper';

const BlockDetails = ({ data, setCurrentData }) => {
  const chain = useSelector(getCurrentChain);
  const items = useMemo(() => data && getItems(data, chain), [data, chain]);

  const scrollRef = useRef(null);
  return (
    <Drawer
      title="Block Details"
      onClose={() => {
        setCurrentData(null);
      }}
      width="60%"
      open={data}
    >
      <div className="h-full overflow-auto" ref={scrollRef}>
        {data && <Descriptions bordered items={items} />}
        <FloatButton.BackTop className="top-1/2" target={() => scrollRef.current} />
      </div>
    </Drawer>
  );
};

export default BlockDetails;
