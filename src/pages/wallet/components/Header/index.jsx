// import { useMemo } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

import { HomeFilled } from '@ant-design/icons';
import { BlockChainIcon, SmartContractIcon } from '@/icons';

import ChianHandle from './components/chianHandle';

/**
 * @description: 导航菜单数据
 * @param {String} basePath 基础路径
 * @return {Array} 导航菜单数据
 */
const getNavigationList = (basePath) => [
  {
    label: 'Main',
    key: `${basePath}/`,
    path: '',
    icon: <HomeFilled />,
  },
  {
    label: 'Blockchain View',
    key: `${basePath}/blockchainView`,
    path: 'blockchainView',
    icon: <BlockChainIcon />,
  },
  {
    label: 'Interact With Smart Contracts',
    key: `${basePath}/interact`,
    path: 'interact',
    icon: <SmartContractIcon />,
  },
];

const Header = () => {
  const matches = useMatches();
  const navigate = useNavigate();

  const basePath = matches[0].pathname;
  const navigationList = getNavigationList(basePath);
  const pathMap = {};
  navigationList.forEach((item) => {
    pathMap[item.key] = item.path;
  });

  return (
    <div className="flex items-center justify-between rounded-lg bg-white pr-[10px]">
      <Menu
        className="bg-transparent"
        selectedKeys={matches.map((m) => m.pathname)}
        mode="horizontal"
        items={navigationList}
        onClick={({ key }) => navigate(pathMap[key])}
      />
      <ChianHandle />
    </div>
  );
};
export default Header;
