import { useState, useEffect, useCallback } from 'react';
import { List, Button, Input, Form, Popover } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const LABEL_SPAN = 7;
/**
 * @description: 管理员列表相关操作
 * @param {Object} contract 合约对象
 * @param {Function} onMessage 提示语方法
 * @param {Boolean} isGod 是否是上帝权限
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {ReactNode}
 */
const AdministratorList = ({ contract, onMessage, isGod, getExplorerDom }) => {
  const [form] = Form.useForm();
  //正在设置中
  const [isPending, setIsPending] = useState(false);
  //进来获取数据
  const [isFetching, setIsFetching] = useState(true);
  //搜索关键词
  const [keywords, setKeywords] = useState('');
  //管理员列表
  const [list, setList] = useState([]);
  const filterList = keywords ? list.filter((addr) => addr === keywords) : list;

  //获取列表
  const getAdministratorList = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await contract.methods.getAdministratorList().call();
      console.log('AdministratorList', data);
      setList(data);
    } catch ({ message }) {
      onMessage(message, 'error');
    } finally {
      setIsFetching(false);
    }
  }, [contract, onMessage]);

  //添加管理员
  const addAdministrator = useCallback(
    async ({ address }) => {
      setIsPending(true);
      try {
        await contract.methods.addAdministrator(address).send();
        getAdministratorList();
        onMessage('add successfully');
        form.resetFields();
      } catch ({ message }) {
        onMessage(message, 'error');
      } finally {
        setIsPending(false);
      }
    },
    [contract, onMessage, getAdministratorList, form]
  );

  //删除管理员
  const deleteAdministrator = useCallback(
    async (address) => {
      setIsPending(true);
      try {
        await contract.methods.deleteAdministrator(address).send();
        getAdministratorList();
        onMessage('delete successfully');
      } catch ({ message }) {
        onMessage(message, 'error');
      } finally {
        setIsPending(false);
      }
    },
    [contract, onMessage, getAdministratorList]
  );

  //进来获取列表
  useEffect(() => {
    getAdministratorList();
  }, [getAdministratorList]);
  return (
    <List
      loading={isFetching}
      header={
        <Form
          form={form}
          labelCol={{
            span: LABEL_SPAN,
          }}
          onFinish={addAdministrator}
        >
          <Form.Item label="Search AddAdministrator">
            <Input.Search placeholder="search address" onSearch={setKeywords} allowClear />
          </Form.Item>
          {isGod && (
            <>
              <Form.Item
                label="Add AddAdministrator "
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input address!',
                  },
                ]}
              >
                <Input placeholder="Input the addAdministrator address" allowClear />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: LABEL_SPAN,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusCircleOutlined />}
                  loading={isPending}
                >
                  Add Administrator
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      }
      dataSource={filterList}
      renderItem={(item) => (
        <List.Item
          actions={
            isGod && [
              <Popover
                key="delete"
                content={
                  <div>
                    Are you sure you want to delete it?
                    <br />
                    <Button
                      type="link"
                      danger
                      onClick={() => {
                        deleteAdministrator(item);
                      }}
                    >
                      confirm
                    </Button>
                  </div>
                }
                title="Delete confirmation"
                trigger="click"
              >
                <Button type="primary" icon={<DeleteOutlined />} loading={isPending} danger>
                  Delete
                </Button>
                ,
              </Popover>,
            ]
          }
        >
          {getExplorerDom({ value: item })}
        </List.Item>
      )}
    />
  );
};

export default AdministratorList;
