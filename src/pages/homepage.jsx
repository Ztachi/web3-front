import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { EditTwoTone, ToolTwoTone, BankTwoTone } from '@ant-design/icons';

import FloatButtonList from '@/components/floatButtonList';

const { Meta } = Card;

//首页导航数据
const items = [
  {
    title: 'Go to the tools page',
    description: 'Use some blockchain-related tools',
    url: '/tools',
    icon: <ToolTwoTone className="py-10 text-[40px]" />,
  },
  {
    title: 'Go to the login page',
    description: 'Log in to the wallet system',
    url: '/login',
    icon: <BankTwoTone className="py-10 text-[40px]" />,
  },
  {
    title: 'Go to the demo page',
    description: 'Do something for myself to practice',
    url: '/demo',
    icon: <EditTwoTone className="py-10 text-[40px]" />,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center gap-[20px]">
      {items.map(({ title, description, icon, url }) => (
        <Card
          key={url}
          className="w-[210px] transition-transform  hover:scale-125 hover:relative hover:z-10"
          hoverable
          onClick={() => navigate(url)}
          cover={icon}
        >
          <Meta title={title} description={description} />
        </Card>
      ))}
      <FloatButtonList isHomePage />
    </div>
  );
};
export default HomePage;
