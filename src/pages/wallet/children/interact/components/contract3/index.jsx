import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChain } from '@/store/modules/chain';

import { Button, InputNumber, Card, Drawer } from 'antd';
import { UserOutlined, TeamOutlined, BankTwoTone } from '@ant-design/icons';

import UserInfo from './components/userInfo';
import AdministratorList from './components/administratorList';
import UserList from './components/userList';

import { GET_BALANCE_INTERVAL } from '@/const';
import { getBalanceUnits } from '@/helper';

/**
 * @description: 智能合约模块
 * @param {Object} contract 合约对象
 * @param {String} address 合约地址
 * @param {String} account 当前账号
 * @param {Function} onMessage 提示语方法
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {ReactNode}
 */
const Contract3 = ({ contract, account, utils, onMessage, className, getExplorerDom }) => {
  const { toWei, fromWei } = utils;

  //单位
  const units = getBalanceUnits(useSelector(getCurrentChain));

  //存款输入框
  const depositRef = useRef(null);
  //取款输入框
  const withdrawRef = useRef(null);

  //正在设置中
  const [isPending, setIsPending] = useState(false);

  //用户信息
  const [userInfo, setUserInfo] = useState(null);
  //银行总金额
  const [store, setStore] = useState('fetching...');
  //是否是管理员
  const [isAdministrator, setIsAdministrator] = useState(false);
  //是否是上帝
  const [isGod, setIsGod] = useState(false);
  //打开什么管理列表 'Role'角色管理 'User'用户管理
  const [management, setManagement] = useState('');

  //获取用户信息
  const getUserInfo = useCallback(() => {
    //账号改变重置
    setIsPending(false);
    //基本信息
    async function getUser() {
      try {
        const info = await contract.methods.getUser(account).call();
        setUserInfo(info);
      } catch (error) {
        onMessage(error.message, 'error');
      }
    }

    //是否是管理员
    async function checkIsAdministrator() {
      try {
        const administrator = await contract.methods.checkIsAdministrator().call();
        setIsAdministrator(administrator);
      } catch (error) {
        onMessage(error.message, 'error');
      }
    }

    //是否是上帝
    async function checkIsGod() {
      try {
        const god = await contract.methods.checkIsGod().call();
        setIsGod(god);
      } catch (error) {
        onMessage(error.message, 'error');
      }
    }
    getUser();
    checkIsAdministrator();
    checkIsGod();
  }, [contract, onMessage, account]);

  //获取银行总金额
  const getBankStore = useCallback(async () => {
    try {
      const balance = await contract.methods.getBalance().call();
      console.log('getBankStore', balance);

      setStore((balance && fromWei(balance, 'ether')) || 0);
    } catch (error) {
      onMessage(error.message, 'error');
    }
  }, [contract, onMessage, fromWei]);

  //进来直接获取一次
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  //进来直接获取一次
  useEffect(() => {
    getBankStore();
    //周期性刷新
    const interval = setInterval(getBankStore, GET_BALANCE_INTERVAL);
    return () => clearInterval(interval);
  }, [getBankStore]);

  //存钱
  const deposit = useCallback(async () => {
    setIsPending(true);
    try {
      const d = await contract.methods.deposit().send({
        value: toWei(depositRef.current.value, 'ether'),
      });
      if (d.transactionHash) {
        onMessage('successfully set!');
      }
    } catch (e) {
      onMessage(e.message, 'error');
    } finally {
      getBankStore();
      getUserInfo();
      setIsPending(false);
    }
  }, [contract, onMessage, getBankStore, getUserInfo, toWei]);

  //取钱
  const withdraw = useCallback(
    async (isAll) => {
      setIsPending(true);
      try {
        const d = await contract.methods[isAll ? 'withdrawAll' : 'withdraw'](
          !isAll && toWei(withdrawRef.current.value, 'ether')
        ).send();
        if (d.transactionHash) {
          onMessage('successfully set!');
        }
      } catch (e) {
        onMessage(e.message, 'error');
      } finally {
        getBankStore();
        getUserInfo();
        setIsPending(false);
      }
    },
    [contract, onMessage, getBankStore, getUserInfo, toWei]
  );

  return (
    <Card
      className={className}
      title={
        <>
          <BankTwoTone className="mr-[5px]" />
          Bank
        </>
      }
      extra={
        <>
          Vault: <b className="text-[#da70d6]">{store}</b> {units}
        </>
      }
    >
      <UserInfo
        data={userInfo}
        account={account}
        units={units}
        fromWei={fromWei}
        getExplorerDom={getExplorerDom}
      />
      <ul>
        <li className="mt-[10px] flex gap-[10px]">
          <InputNumber
            className="flex-1"
            ref={depositRef}
            addonBefore="Deposit:"
            suffix={units}
            min={0}
            placeholder="Input the deposit amount"
            changeOnWheel
            controls={false}
          />
          <Button
            type="primary"
            onClick={() => {
              if (depositRef.current.value) {
                deposit();
              } else {
                onMessage('Please input the deposit amount', 'error');
              }
            }}
            loading={isPending}
          >
            Deposit
          </Button>
        </li>
        <li className="mt-[10px] flex gap-[10px]">
          <InputNumber
            className=" flex-1"
            ref={withdrawRef}
            addonBefore="Withdraw:"
            suffix={units}
            min={0}
            placeholder="Please input the withdraw amount"
            changeOnWheel
            controls={false}
          />
          <Button
            type="primary"
            onClick={() => {
              if (withdrawRef.current.value) {
                withdraw(false);
              } else {
                onMessage('Input the withdraw amount', 'error');
              }
            }}
            loading={isPending}
          >
            Withdraw
          </Button>
          <Button type="primary" onClick={() => withdraw(true)} loading={isPending}>
            Withdraw All
          </Button>
        </li>
        {(isAdministrator || isGod) && (
          <li className="mt-[10px] flex gap-[10px]">
            <Button
              type="primary"
              icon={<TeamOutlined />}
              onClick={() => {
                setManagement('Role');
              }}
            >
              Role Management
            </Button>
            <Button
              type="primary"
              icon={<UserOutlined />}
              onClick={() => {
                setManagement('User');
              }}
            >
              User Management
            </Button>
            <Drawer
              title={`${management} Management`}
              width="40%"
              onClose={() => setManagement('')}
              open={!!management}
              destroyOnClose
            >
              {management === 'Role' && (
                <AdministratorList
                  contract={contract}
                  isGod={isGod}
                  onMessage={onMessage}
                  getExplorerDom={getExplorerDom}
                />
              )}
              {management === 'User' && (
                <UserList
                  contract={contract}
                  isGod={isGod}
                  units={units}
                  fromWei={fromWei}
                  onMessage={onMessage}
                  getExplorerDom={getExplorerDom}
                />
              )}
            </Drawer>
          </li>
        )}
      </ul>
    </Card>
  );
};

export default Contract3;
