import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const FloatButtonList = () => {
  const navigate = useNavigate();
  return (
    <FloatButton.Group shape="circle">
      <FloatButton type="primary" onClick={() => navigate('/')} icon={<HomeOutlined />} />
    </FloatButton.Group>
  );
};

export default FloatButtonList;
