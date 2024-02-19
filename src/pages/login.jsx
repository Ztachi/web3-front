import { Card } from 'antd';

// import FloatButtonList from '@/components/FloatButtonList';

import walletList from '@/libs/wallet/walletList';
import {
  // getHasMetaMaskExtensionInstalled,
  tryActivateConnector,
  // tryDeactivateConnector,
} from '@/libs/wallet/connections';
import useCheckWalletConnection from '@/hooks/useCheckWalletConnection';

const Login = () => {
  //检查登录状态
  useCheckWalletConnection();

  //连接钱包
  async function connect(connector) {
    await tryActivateConnector(connector);
  }
  // function quit(connector) {
  //   tryDeactivateConnector(connector);
  // }

  return (
    <div className="h-screen flex justify-center items-center">
      {walletList.map(({ name, icon, connector }) => (
        <Card
          key={name}
          className="mr-[20px]"
          hoverable
          onClick={() => {
            connect(connector);
          }}
          cover={
            <div className="text-center py-10">
              <img className="w-1/2" src={icon} alt={name} />
            </div>
          }
        >
          <Card.Meta title={name} description={`Login by ${name} wallet`} />
        </Card>
      ))}
    </div>
  );
};

export default Login;
