import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, GithubFilled, XOutlined } from '@ant-design/icons';

const FloatButtonList = ({ isHomePage }) => {
  const navigate = useNavigate();
  return (
    <FloatButton.Group shape="circle">
      <FloatButton href="https://github.com/Ztachi" target="_blank" icon={<GithubFilled />} />
      <FloatButton href="https://twitter.com/web3_bearrr" target="_blank" icon={<XOutlined />} />
      {!isHomePage && (
        <FloatButton type="primary" onClick={() => navigate('/')} icon={<HomeOutlined />} />
      )}
    </FloatButton.Group>
  );
};

export default FloatButtonList;
