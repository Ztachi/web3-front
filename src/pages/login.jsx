import { Card } from 'antd';
import IconMetaMask from '@/assets/icons/metamask.svg';
import FloatButtonList from '@/components/floatButtonList';

const walletList = [
  {
    name: 'MetaMask',
    icon: IconMetaMask,
  },
];

const Login = () => (
  <>
    <div className="h-screen flex justify-center items-center">
      {walletList.map(({ name, icon }) => (
        <Card
          key={name}
          className="mr-[20px]"
          hoverable
          // onClick={() => navigate('/demo')}
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
    <FloatButtonList />
  </>
);

export default Login;
