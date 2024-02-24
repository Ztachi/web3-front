import { useRef, useEffect } from 'react';
import { Outlet, useLocation, useOutlet, useMatches } from 'react-router-dom';

import Header from './components/Header';
import CommonSuspense from '@/components/layout/commonSuspense';
import FloatButtonList from '@/components/floatButtonList';

const Tools = () => {
  const location = useLocation();
  const { pathname } = location;
  const matches = useMatches();
  const outlet = useOutlet();
  //缓存列表页
  const saveChainListPage = useRef(null);
  //是否是列表页
  const isChainListPage = pathname === '/tools';

  //是列表页
  if (isChainListPage) {
    //没设置就设置
    if (!saveChainListPage.current) {
      saveChainListPage.current = outlet;
    }
  }

  useEffect(() => {
    // 不是列表页
    if (!isChainListPage) {
      //也不是详情页

      if (!matches[1].params.chainId) {
        //就清除
        saveChainListPage.current = null;
      }
    }
  }, [matches, isChainListPage]);

  return (
    <div className="grid grid-rows-[50px_1fr] gap-[10px] container rounded-lg">
      <Header />
      <div className="bg-white rounded-lg relative">
        <CommonSuspense>
          <div className={isChainListPage ? 'block' : 'hidden'}>{saveChainListPage.current}</div>
          {!isChainListPage && <Outlet />}
        </CommonSuspense>
      </div>
      <FloatButtonList />
    </div>
  );
};

export default Tools;
