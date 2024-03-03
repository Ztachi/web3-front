import { useState, useContext, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import { Button, Input, InputNumber, Form, Card, Select, message } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';

import { getCurrentChain } from '@/store/modules/chain';

import { GET_GAS_PRICE_INTERVAL } from '@/const';
import getBalanceUnits from '../basicInfo/helper';

/**
 * @description:
 * @param {String} account 当前选中账号
 * @param {Array[String]} accounts 所有账号列表
 * @return {ReactNode}
 */
const Transaction = ({ account, accounts }) => {
  const web3 = useContext(Web3Context);

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  //当前链信息
  const currentChainInformation = useSelector(getCurrentChain);
  //是否正在处理
  const [isPending, setIsPending] = useState(false);
  //发送金额
  const [sendAmount, setSendAmount] = useState(0);
  //gas fee
  const [gasPrice, setGasPrice] = useState(BigInt(0));

  const units = getBalanceUnits(currentChainInformation);

  const { toWei, fromWei, toBigInt } = web3.utils;

  //最新交易费估计
  const [transactionFee, setTransactionFee] = useState(BigInt(0));

  /**
   * @description: 发送交易
   * @param {Object} data 交易数据
   * @return {*}
   */
  const finish = useCallback(
    (data) => {
      console.log(data);
      data.value = toWei(data.value, 'ether');
      setIsPending(true);
      web3.eth
        .sendTransaction(data)
        .then((d) => {
          if (d.transactionHash) {
            messageApi.success('transfer success!');
          }
        })
        .catch((e) => {
          messageApi.error(e.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    },
    [web3.eth, messageApi, toWei]
  );

  /**
   * @description: 获取并设置交易费
   * @param {Object} allValues 交易数据
   * @return {*}
   */
  const getEstimateGas = useCallback(
    (changedValues, allValues) => {
      if (allValues?.value && allValues.to) {
        allValues.value = toWei(allValues.value, 'ether');

        web3.eth.estimateGas(allValues).then((d) => {
          setTransactionFee(d * gasPrice);
        });
      }
    },
    [web3.eth, toWei, gasPrice]
  );

  //gas price改变，重新计算transaction fee
  useEffect(() => {
    getEstimateGas(null, form.getFieldsValue());
  }, [form, getEstimateGas, gasPrice]);

  useEffect(() => {
    web3.eth.getGasPrice().then(setGasPrice);
    //周期性刷新gas fee
    const interval = setInterval(() => {
      web3.eth.getGasPrice().then(setGasPrice);
    }, GET_GAS_PRICE_INTERVAL);
    return () => clearInterval(interval);
  }, [web3, currentChainInformation]);

  return (
    <Card
      title="Transaction"
      extra={
        <>
          Average Gas Price:
          <b> {fromWei(gasPrice, 'ether')} </b>
          {units}
        </>
      }
    >
      {contextHolder}
      <Form
        form={form}
        initialValues={{
          from: account,
        }}
        onFinish={finish}
        onValuesChange={getEstimateGas}
        className="mt-[20px]"
      >
        <Form.Item
          label="to address"
          name="to"
          rules={[
            {
              required: true,
              message: 'Please input your recipient address!',
            },
          ]}
        >
          <Input placeholder="input recipient address" />
        </Form.Item>
        <Form.Item label="from address" name="from">
          <Select options={accounts.map((d) => ({ value: d, label: d }))} />
        </Form.Item>
        <Form.Item
          label="Transfer Amount"
          name="value"
          extra={
            sendAmount && (
              <>
                Total Estimated Amount:
                <b>{fromWei(toBigInt(toWei(sendAmount, 'ether')) + transactionFee, 'ether')}</b>
              </>
            )
          }
          rules={[
            {
              required: true,
              message: 'Please input transfer amount!',
            },
          ]}
        >
          <InputNumber
            className="w-[270px]"
            min={0}
            placeholder="input transfer amount"
            onChange={setSendAmount}
            addonAfter={units}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<TransactionOutlined />}
            loading={isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Transaction;
