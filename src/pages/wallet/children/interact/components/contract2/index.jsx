import { useState, useCallback, useEffect } from 'react';
import { Button, Input, Form, List } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';

import { formatTimestamp } from '@/helper';

const LABEL_SPAN = 4;

/**
 * @description: 智能合约模块
 * @param {Object} contract 合约对象
 * @param {String} address 合约地址
 * @param {String} account 当前账号
 * @param {Function} onMessage 提示语方法
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {ReactNode}
 */
const Contract2 = ({ contract, onMessage, className, getExplorerDom }) => {
  const [form] = Form.useForm();
  //正在设置中
  const [isPending, setIsPending] = useState(false);
  const [InitLoading, setInitLoading] = useState(true);

  //评论列表
  const [comments, setComments] = useState([]);

  //获取世界名称
  const getComments = useCallback(async () => {
    try {
      const dataList = await contract.methods.getComments().call();
      console.log('Comments:', dataList);
      setComments(dataList.reverse());
    } catch (error) {
      onMessage(error.message, 'error');
    } finally {
      setInitLoading(false);
    }
  }, [contract, onMessage]);

  //进来直接获取一次
  useEffect(() => {
    getComments();
  }, [getComments]);

  //点击提交
  const finish = useCallback(
    async ({ content }) => {
      setIsPending(true);
      try {
        const d = await contract.methods.sendComment(content).send();
        if (d.transactionHash) {
          form.resetFields();
          onMessage('send successfully!');
        }
      } catch (e) {
        onMessage(e.message, 'error');
      } finally {
        getComments();
        setIsPending(false);
      }
    },
    [contract, onMessage, getComments, form]
  );

  return (
    <List
      className={className}
      loading={InitLoading}
      header={
        <div className="flex justify-between">
          <b>
            <MessageTwoTone className="mr-[5px]" />
            Comments
          </b>
          <div>
            Comment Amount: <b>{comments.length}</b>
          </div>
        </div>
      }
      bordered
      size="large"
      rowKey={({ timestamp, addr }) => timestamp.toString() + addr}
      dataSource={comments}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<b>{getExplorerDom({ value: item.addr })}</b>}
            description={formatTimestamp(item.timestamp.toString())}
          />
          {item.comment}
        </List.Item>
      )}
      footer={
        <Form
          labelCol={{
            span: LABEL_SPAN,
          }}
          form={form}
          onFinish={finish}
        >
          <Form.Item
            label="comment"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please input content!',
              },
            ]}
          >
            <Input.TextArea
              placeholder="input content"
              allowClear
              showCount
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: LABEL_SPAN,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isPending}>
              Send comment
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
};

export default Contract2;
