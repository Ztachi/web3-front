import { Suspense } from 'react';
import { Spin } from 'antd';

import { Loading } from '@/icons';

const CommonSuspense = ({ children, fullscreen = false }) => (
  <Suspense
    fallback={
      fullscreen ? (
        <Spin
          indicator={<Loading className="animate-[spin_2s_linear_infinite] !text-[100px]" />}
          fullscreen
        />
      ) : (
        <div className="h-full flex justify-center items-center">
          <Spin
            indicator={<Loading className="animate-[spin_2s_linear_infinite] !text-[100px]" />}
          />
        </div>
      )
    }
  >
    {children}
  </Suspense>
);

export default CommonSuspense;
