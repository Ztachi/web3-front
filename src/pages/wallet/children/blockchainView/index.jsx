import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import { Button, Input, InputNumber, Form, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import useGetBlockchainDataList from '@/hooks/useGetBlockchainDataList';
import PageLoading from '@/components/pageLoading';
import SecondLevelPage from '@/components/layout/secondLevelPage';
import BlockchainChart from './components/blockchainChart';

import { getNewBlockNumber } from '@/store/modules/block';

const BlockchainView = () => {
  const connector = useWeb3React();
  const [form] = Form.useForm();
  //最新区块号
  const newBlockNumber = useSelector(getNewBlockNumber);

  //区块序号 934 2518
  const [blockNumber, setBlockNumber] = useState('latest');
  //往前展示多少个区块
  const [blockAmount, setBlockAmount] = useState(3);
  //是否保持最新
  const [isKeepLatest, setIsKeepLatest] = useState(true);

  const { chainId } = connector;

  //获取到的数据列表和是否正在获取
  const { blockchainDataList, isFetching } = useGetBlockchainDataList(
    chainId,
    blockNumber,
    blockAmount
  );

  useEffect(() => {
    setIsKeepLatest(true);
  }, [chainId]);

  useEffect(() => {
    //开启了一直展示最新区块号
    if (isKeepLatest && newBlockNumber && !isFetching) {
      const number = newBlockNumber;
      setBlockNumber(number);
      form.setFieldsValue({
        blockNumber: number,
      });
    }
  }, [isKeepLatest, newBlockNumber, form, isFetching]);

  return (
    <div>
      <SecondLevelPage
        headers={
          <Form
            form={form}
            layout="inline"
            initialValues={{
              blockNumber,
              blockAmount,
            }}
            onFinish={(data) => {
              //手动搜索区块数的话就接触自动更新
              if (data.blockNumber !== blockNumber) {
                setBlockNumber(data.blockNumber);
                setIsKeepLatest(false);
              }
              setBlockAmount(data.blockAmount);
            }}
          >
            <Form.Item
              label="Block"
              name="blockNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input block hash or number',
                },
              ]}
            >
              <Input className="w-[530px]" placeholder="block hash or number" allowClear />
            </Form.Item>
            <Form.Item label="Block Amount" name="blockAmount">
              <InputNumber min={1} max={10} changeOnWheel />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                loading={isFetching}
              >
                Search Block
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="flex justify-center items-center">
                Keep the Latest Block:
                <Switch
                  className="bg-gray-300 ml-[10px]"
                  checked={isKeepLatest}
                  onChange={setIsKeepLatest}
                />
              </div>
            </Form.Item>
          </Form>
        }
      >
        {blockchainDataList ? (
          <BlockchainChart dataList={blockchainDataList} isFetching={isFetching} />
        ) : (
          <PageLoading />
        )}
      </SecondLevelPage>
    </div>
  );
};

export default BlockchainView;
