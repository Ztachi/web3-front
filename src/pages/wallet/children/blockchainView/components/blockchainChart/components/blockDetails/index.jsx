import { useRef, useMemo } from 'react';
import { Drawer, Descriptions, FloatButton } from 'antd';

import getItems from './helper';

const BlockDetails = ({ data, setCurrentData }) => {
  const items = useMemo(() => data && getItems(data), [data]);
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
