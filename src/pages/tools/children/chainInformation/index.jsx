// import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import SecondLevelPage from '@/components/layout/secondLevelPage';

const ChainInformation = () => {
  const { chainId } = useParams();
  const { state } = useLocation();
  return (
    <SecondLevelPage
      options={{
        state,
      }}
    >
      {chainId}
    </SecondLevelPage>
  );
};

export default ChainInformation;
