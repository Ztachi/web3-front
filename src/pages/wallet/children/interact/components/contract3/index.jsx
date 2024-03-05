import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentChain } from '@/store/modules/chain';

import { Button, InputNumber, Card, Descriptions, Typography } from 'antd';

import { formatTimestamp, getBalanceUnits, fixedZeroEth } from '@/helper';

function getItems(userInfo, account, units, fromWei) {
  const lastLog = userInfo.transactionLog.at(-1);
  const balance = fromWei(userInfo.balance, 'ether');
  return [
    {
      key: 'Account',
      label: 'Account',
      children: <Typography.Paragraph copyable={{ text: account }}>{account}</Typography.Paragraph>,
      span: 3,
    },
    {
      key: 'Balance',
      label: 'Balance',
      children: (
        <>
          <b className="pr-[5px]">{fixedZeroEth(balance)}</b> {units}
        </>
      ),
      span: 3,
    },
    {
      key: 'The last transaction',
      label: 'The last transaction',
      children: lastLog ? (
        <>
          [<b>{lastLog.category}</b>] - [<b>{fixedZeroEth(fromWei(lastLog.value, 'ether'))}</b>] - [
          <b>{formatTimestamp(lastLog.timestamp.toString())}</b>]
          <Button type="link" size="small">
            show more
          </Button>
        </>
      ) : (
        ' - '
      ),
    },
  ];
}

/**
 * @description: 智能合约模块
 * @param {Object} contract 合约对象
 * @param {String} address 合约地址
 * @param {String} account 当前账号
 * @param {Function} onMessage 提示语方法
 * @return {ReactNode}
 */
const Contract3 = ({ contract, account, utils, onMessage, className }) => {
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

  //获取用户信息
  const getUserInfo = useCallback(async () => {
    //基本信息
    contract.methods
      .getUser(account)
      .call()
      .then((info) => {
        setUserInfo(info);
      })
      .catch((error) => {
        onMessage(error.message, 'error');
      });
    //是否是管理员
    contract.methods
      .checkIsAdministrator()
      .call()
      .then((info) => {
        setIsAdministrator(info);
      })
      .catch((error) => {
        onMessage(error.message, 'error');
      });
    //是否是上帝
    contract.methods
      .checkIsGod()
      .call()
      .then((info) => {
        setIsGod(info);
      })
      .catch((error) => {
        onMessage(error.message, 'error');
      });
  }, [contract, onMessage, account]);

  //获取银行总金额
  const getBankStore = useCallback(async () => {
    try {
      const balance = await contract.methods.getBalance().call();
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

  const items = userInfo && getItems(userInfo, account, units, fromWei);

  return (
    <Card
      className={className}
      title="Changing the world name"
      extra={
        <>
          Vault: <b className="text-[#da70d6]">{store}</b> {units}
        </>
      }
    >
      <Descriptions title="User Info" items={items} />
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
          <Button type="primary" onClick={deposit} loading={isPending}>
            Submit
          </Button>
        </li>
        <li className="mt-[10px] flex gap-[10px]">
          <InputNumber
            className=" flex-1"
            ref={withdrawRef}
            addonBefore="Withdraw:"
            suffix={units}
            min={0}
            placeholder="Input the withdraw amount"
            changeOnWheel
            controls={false}
          />
          <Button type="primary" onClick={() => withdraw(false)} loading={isPending}>
            Submit
          </Button>
          <Button type="primary" onClick={() => withdraw(true)} loading={isPending}>
            Withdraw All
          </Button>
        </li>
        {isGod && (
          <li className="mt-[10px] flex gap-[10px]">
            <Button type="primary" disabled>
              getAdministratorList
            </Button>
          </li>
        )}
        {(isAdministrator || isGod) && (
          <li className="mt-[10px] flex gap-[10px]">
            <Button type="primary" disabled>
              getAdministratorList
            </Button>
          </li>
        )}
      </ul>
    </Card>
  );
};

export default Contract3;
