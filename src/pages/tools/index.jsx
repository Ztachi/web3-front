import Header from './components/Header';
import CommonSuspense from '@/components/layout/commonSuspense';
import { Outlet } from 'react-router-dom';

const Tools = () => (
  <div className="grid grid-rows-[50px_1fr] gap-[10px] container rounded-lg">
    <Header />
    <div className="bg-white rounded-lg relative">
      <CommonSuspense>
        <Outlet />
      </CommonSuspense>
    </div>
  </div>
);

export default Tools;
