import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

const useCheckWalletConnection = async () => {
  const { account } = useWeb3React();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //登录了
    if (account) {
      //还在登录界面就跳转钱包界面
      if (pathname.startsWith('/login')) {
        navigate('/wallet', { replace: true });
      }
    } else {
      //没登录，在钱包界面就跳回登录界面
      if (pathname.startsWith('/wallet')) {
        navigate('/login', { state: { isBackToLogin: true } });
      }
    }
  }, [account, navigate, pathname]);
};
export default useCheckWalletConnection;
