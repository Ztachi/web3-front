/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:00:54
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-08 21:16:20
 * @Description:
 */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/store/modules/counter';
import { Badge, Button, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import request from '@/api';

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
      <img src="/vite.svg" className="logo w-[30px]" alt="Vite logo" />
      <List dataSource={regionList} renderItem={({ name }) => <List.Item>{name}</List.Item>} />
      <Badge count={count} showZero color="#faad14" />
      <Button icon={<PlusOutlined />} onClick={() => dispatch(increment())}>
        Add
      </Button>
    </div>
  );
};

export default Wallet;
