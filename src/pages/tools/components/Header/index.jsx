import { useState } from 'react';
import { Menu } from 'antd';

import { BlockChainIcon1 } from '@/icons';

const navigationList = [
  {
    label: 'Chains Search',
    key: 'Chains Search',
    icon: <BlockChainIcon1 />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('Chains Search');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="flex justify-between items-center rounded-lg bg-white">
      <Menu
        className="bg-transparent"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={navigationList}
      />
    </div>
  );
};
export default Header;
