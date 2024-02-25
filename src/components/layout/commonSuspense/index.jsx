import { Suspense } from 'react';
import { Spin } from 'antd';

import { Loading } from '@/icons';

import PageLoading from '@/components/pageLoading';

const CommonSuspense = ({ children, fullscreen = false }) => (
  <Suspense
    fallback={
      fullscreen ? (
        <Spin
          indicator={<Loading className="animate-[spin_2s_linear_infinite] !text-[100px]" />}
          fullscreen
        />
      ) : (
        <PageLoading />
      )
    }
  >
    {children}
  </Suspense>
);

export default CommonSuspense;
