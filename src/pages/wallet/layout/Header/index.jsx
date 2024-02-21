import { useState } from 'react';
import { Menu } from 'antd';

import { HomeFilled } from '@ant-design/icons';
import { BlockChainIcon, SmartContractIcon } from '@/icons';

const navigationList = [
  {
    label: 'Main',
    key: 'Main',
    icon: <HomeFilled />,
  },
  {
    label: 'Blockchain View',
    key: 'Blockchain View',
    icon: <BlockChainIcon />,
  },
  {
    label: 'Interact With Smart Contracts',
    key: 'Interact With Smart Contracts',
    icon: <SmartContractIcon />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('Main');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className="flex  rounded-lg bg-white">
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
