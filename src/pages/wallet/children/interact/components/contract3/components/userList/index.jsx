import { useState, useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { List, Button, Input, Popover, Skeleton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import UserInfo from '../userInfo';

/**
 * @description: 用户列表相关操作
 * @param {Object} contract 合约对象
 * @param {Function} onMessage 提示语方法
 * @param {Boolean} isGod 是否是上帝权限
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {ReactNode}
 */
const UserList = ({ contract, onMessage, units, fromWei, isGod, getExplorerDom }) => {
  //正在设置中
  const [isPending, setIsPending] = useState(false);
  //进来获取数据
  const [isFetching, setIsFetching] = useState(true);
  //搜索关键词
  const [keywords, setKeywords] = useState('');
  //用户列表
  const [list, updateList] = useImmer([]);
  const filterList = keywords ? list.filter(({ address }) => address === keywords) : list;

  //获取列表
  const getUserList = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await contract.methods.getUserList().call();
      console.log('UserList', data);
      updateList(
        data.map((addr) => ({
          address: addr,
          isItemFetching: false,
          detail: null,
        }))
      );
    } catch ({ message }) {
      onMessage(message, 'error');
    } finally {
      setIsFetching(false);
    }
  }, [contract, onMessage, updateList]);

  //获取用户详情
  const getUserInfo = useCallback(
    async (address) => {
      updateList((draft) => {
        const item = draft.find(({ address: addr }) => address === addr);
        item.isItemFetching = true;
      });
      try {
        const info = await contract.methods.getUser(address).call();

        updateList((draft) => {
          const item = draft.find(({ address: addr }) => address === addr);
          item.detail = info;
        });
      } catch (error) {
        onMessage(error.message, 'error');
      } finally {
        updateList((draft) => {
          const item = draft.find(({ address: addr }) => address === addr);
          item.isItemFetching = false;
        });
      }
    },
    [contract, onMessage, updateList]
  );

  //销毁用户
  const deleteUser = useCallback(
    async (address) => {
      setIsPending(true);
      try {
        await contract.methods.destroyingAccount(address).send();
        getUserList();
        onMessage('delete successfully');
      } catch ({ message }) {
        onMessage(message, 'error');
      } finally {
        setIsPending(false);
      }
    },
    [contract, onMessage, getUserList]
  );

  //进来获取列表
  useEffect(() => {
    getUserList();
  }, [getUserList]);
  return (
    <List
      itemLayout="vertical"
      loading={isFetching}
      header={
        <Input.Search placeholder="search user by address" onSearch={setKeywords} allowClear />
      }
      dataSource={filterList}
      renderItem={({ address, detail, isItemFetching }) => (
        <List.Item
          actions={[
            <Button
              key="detail"
              loading={isItemFetching}
              onClick={() => {
                if (detail) {
                  updateList((draft) => {
                    const item = draft.find(({ address: addr }) => address === addr);
                    item.detail = null;
                  });
                } else {
                  getUserInfo(address);
                }
              }}
            >
              {detail ? 'hide' : 'show'} Detail
            </Button>,
            isGod && (
              <Popover
                key="destroy"
                content={
                  <div>
                    Are you sure to destroy the user and refund the balance?
                    <br />
                    <Button
                      type="link"
                      danger
                      onClick={() => {
                        deleteUser(address);
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
                  Destroy
                </Button>
                ,
              </Popover>
            ),
          ]}
        >
          <List.Item.Meta title={getExplorerDom({ value: address })} />
          {detail ? (
            <UserInfo data={detail} account={address} units={units} fromWei={fromWei} isList />
          ) : (
            isItemFetching && <Skeleton active />
          )}
        </List.Item>
      )}
    />
  );
};

export default UserList;
