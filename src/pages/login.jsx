import { Card, Modal, message } from 'antd';

import FloatButtonList from '@/components/floatButtonList';

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
    try {
      await tryActivateConnector(connector);
    } catch (e) {
      if (e.name === '_NoMetaMaskError') {
        Modal.error({
          content: e.message,
          okText: 'Install',
          maskClosable: true,
          onOk: () => {
            window.open('https://metamask.io/');
          },
        });
      } else {
        message.error({
          content: e.message,
        });
      }
    }
  }
  // function quit(connector) {
  //   tryDeactivateConnector(connector);
  // }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {walletList.map(({ name, Icon, connector }) => (
          <Card
            key={name}
            className="mr-[20px] transition-transform  hover:scale-125 hover:relative hover:z-10"
            hoverable
            onClick={() => {
              connect(connector);
            }}
            cover={
              <div className="text-center py-10">
                <Icon style={{ fontSize: '100px' }} />
              </div>
            }
          >
            <Card.Meta title={name} description={`Login by ${name} wallet`} />
          </Card>
        ))}
      </div>

      <FloatButtonList />
    </>
  );
};

export default Login;
