import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/store/modules/counter';
import { Badge, Button, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import request from '@/api';
import viteLogo from '@/assets/vite.svg';

const Wallet = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [regionList, setRegionList] = useState([]);

  useEffect(() => {
    request.COMMON_GET_REGION_LIST().then((d) => setRegionList(d));
  }, []);

  return (
    <div className="text-primary">
      颜色
      <img src={viteLogo} className="logo w-[30px]" alt="Vite logo" />
      <List dataSource={regionList} renderItem={({ name }) => <List.Item>{name}</List.Item>} />
      <Badge count={count} showZero color="#faad14" />
      <Button onClick={() => dispatch(increment())}>
        <PlusOutlined />
      </Button>
    </div>
  );
};

export default Wallet;
