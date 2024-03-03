import { useState, useCallback, useEffect } from 'react';
import { Button, Input, Form, Card } from 'antd';

const LABEL_SPAN = 6;

/**
 * @description: 智能合约模块
 * @param {Object} contract 合约对象
 * @param {String} address 合约地址
 * @param {String} account 当前账号
 * @param {Function} onMessage 提示语方法
 * @return {ReactNode}
 */
const Contract1 = ({ contract, onMessage, className }) => {
  const [form] = Form.useForm();
  //正在设置中
  const [isPending, setIsPending] = useState(false);

  //世界名称
  const [worldName, setWorldName] = useState('fetching...');

  //获取世界名称
  const getWorldName = useCallback(async () => {
    try {
      const name = await contract.methods.getName().call();
      setWorldName(name);
    } catch (error) {
      onMessage(error.message, 'error');
    }
  }, [contract, onMessage]);

  //进来直接获取一次
  useEffect(() => {
    getWorldName();
  }, [getWorldName]);

  //点击提交
  const finish = useCallback(
    async ({ name }) => {
      setIsPending(true);
      try {
        const d = contract.methods.setName(name).send();
        if (d.transactionHash) {
          form.resetFields();
          onMessage('successfully set!');
        }
      } catch (e) {
        onMessage(e.message, 'error');
      } finally {
        getWorldName();
        setIsPending(false);
      }
    },
    [contract, onMessage, getWorldName, form]
  );

  return (
    <Card
      className={className}
      title="Changing the world name"
      extra={
        <>
          Current: <b>{worldName}</b>
        </>
      }
    >
      <Form
        labelCol={{
          span: LABEL_SPAN,
        }}
        form={form}
        onFinish={finish}
      >
        <Form.Item
          label="World Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your world name!',
            },
          ]}
        >
          <Input placeholder="input world name" allowClear />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: LABEL_SPAN,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isPending}>
            Set world name
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Contract1;
