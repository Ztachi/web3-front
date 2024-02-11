import { Card, Button } from 'antd';

import { useWeb3React } from '@web3-react/core';
import FloatButtonList from '@/components/floatButtonList';
import {
  // getHasMetaMaskExtensionInstalled,
  tryActivateConnector,
  tryDeactivateConnector,
} from '@/libs/wallet/connections';
import walletList from '@/libs/wallet/walletList';

const Login = () => {
  const { chainId, account, isActive } = useWeb3React();

  async function connect(connector) {
    await tryActivateConnector(connector);
  }
  async function quit(connector) {
    await tryDeactivateConnector(connector);
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        account address:
        {account}
        <br />
        chainId:
        {chainId}
        <br />
        isActive:
        {isActive}
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
                {isActive && (
                  <Button
                    type="primary"
                    onClick={(e) => {
                      quit(connector);
                      e.stopPropagation();
                    }}
                  >
                    Quit
                  </Button>
                )}
                <img className="w-1/2" src={icon} alt={name} />
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
