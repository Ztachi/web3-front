import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

const ErrorElement = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center bg-white rounded-lg container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorElement;
