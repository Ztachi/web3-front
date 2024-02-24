import { Suspense } from 'react';
import { Spin } from 'antd';

const CommonSuspense = ({ children }) => (
  <Suspense fallback={<Spin fullscreen />}>{children}</Suspense>
);

export default CommonSuspense;
