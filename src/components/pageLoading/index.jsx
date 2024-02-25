import { Spin } from 'antd';
import { Loading } from '@/icons';

const PageLoading = () => (
  <div className="h-full flex justify-center items-center">
    <Spin indicator={<Loading className="animate-[spin_2s_linear_infinite] !text-[100px]" />} />
  </div>
);

export default PageLoading;
