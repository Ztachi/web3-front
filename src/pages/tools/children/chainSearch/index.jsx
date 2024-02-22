// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getKeywords, getChainByNameOrChain } from '@/store/modules/chain';

import { Card, Descriptions, Popover } from 'antd';

const { Meta } = Card;

const ChainSearch = () => {
  const keywords = useSelector(getKeywords);
  const filterList = useSelector((state) => getChainByNameOrChain(state, keywords));

  return (
    <div className="flex flex-wrap gap-[20px] p-[20px]">
      {filterList.map(({ name, chainId, networkId }) => (
        <Card key={`${networkId}-${chainId}`} className="w-[240px]">
          <Meta
            title={<Popover title={name}>{name}</Popover>}
            description={
              <Descriptions
                items={[
                  { label: 'Chain ID', children: chainId, span: 3 },
                  { label: 'network ID', children: networkId, span: 3 },
                ]}
              />
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default ChainSearch;
