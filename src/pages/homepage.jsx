import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { EditTwoTone, BankTwoTone } from '@ant-design/icons';

const { Meta } = Card;

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <Card
        className="mr-[20px]"
        hoverable
        onClick={() => navigate('/demo')}
        cover={<EditTwoTone className="py-10 text-[40px]" />}
      >
        <Meta title="Go to the demo page" description="Do something for practice" />
      </Card>
      <Card
        hoverable
        onClick={() => navigate('/login')}
        cover={<BankTwoTone className="py-10 text-[40px]" />}
      >
        <Meta title="Go to the login page" description="Log in to the wallet system" />
      </Card>
    </div>
  );
};
export default HomePage;
