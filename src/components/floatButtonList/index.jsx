import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, GithubFilled } from '@ant-design/icons';

const FloatButtonList = ({ isHomePage }) => {
  const navigate = useNavigate();
  return (
    <FloatButton.Group shape="circle">
      <FloatButton href="https://github.com/Ztachi" target="_blank" icon={<GithubFilled />} />
      {!isHomePage && (
        <FloatButton type="primary" onClick={() => navigate('/')} icon={<HomeOutlined />} />
      )}
    </FloatButton.Group>
  );
};

export default FloatButtonList;
