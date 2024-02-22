import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Input } from 'antd';

import { BlockChainIcon1 } from '@/icons';

import { setKeywords } from '@/store/modules/chain';

const { Search } = Input;

const navigationList = [
  {
    label: 'Chains Search',
    key: 'Chains Search',
    icon: <BlockChainIcon1 />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('Chains Search');
  const dispatch = useDispatch();
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
      <Search
        className="w-[400px] mr-[20px]"
        placeholder="search by name or chainId"
        allowClear
        enterButton="Search"
        onSearch={(keywords) => dispatch(setKeywords(keywords))}
      />
    </div>
  );
};
export default Header;
