import { useState, useCallback, useEffect } from 'react';
import { Button, Card, Descriptions } from 'antd';
import { DollarTwoTone } from '@ant-design/icons';

/**
 * @description: ERC20代币
 * @param {Object} contract 合约对象
 * @param {String} address 合约地址
 * @param {String} account 当前账号
 * @param {Function} onMessage 提示语方法
 * @param {Function} getExplorerDom 用于生成hash展示字段dom
 * @return {ReactNode}
 */
const Contract4 = ({ contract, onMessage, account, getExplorerDom, address, className }) => {
  //正在设置中
  const [isPending, setIsPending] = useState(false);
  //单位
  const [unit, setUnit] = useState('');

  //token总发行数
  const [tokenTotal, setTokenTotal] = useState('fetching...');
  //token总发行数
  const [contractBalance, setContractBalance] = useState('fetching...');
  //余额
  const [balance, setBalance] = useState('fetching...');
  //是否获取过代币
  const [hasWithdrawn, setHasWithdrawn] = useState(true);

  //获取token总数
  const getTokenTotal = useCallback(async () => {
    try {
      const total = await contract.methods.totalSupply().call();
      setTokenTotal(total.toString());
    } catch (error) {
      onMessage(error.message, 'error');
    }
  }, [contract, onMessage]);

  //获取合约内token余额
  const getContractBalance = useCallback(async () => {
    try {
      const total = await contract.methods.contractBalance().call();
      setContractBalance(total.toString());
    } catch (error) {
      onMessage(error.message, 'error');
    }
  }, [contract, onMessage]);

  //获取余额
  const getBalance = useCallback(
    async (addr = account) => {
      try {
        const total = await contract.methods.balanceOf(addr).call();
        setBalance(total.toString());
      } catch (error) {
        onMessage(error.message, 'error');
      }
    },
    [contract, onMessage, account]
  );

  //获取单位
  const getUnit = useCallback(async () => {
    try {
      const symbol = await contract.methods.symbol().call();
      setUnit(symbol);
    } catch (error) {
      onMessage(error.message, 'error');
    }
  }, [contract, onMessage]);

  //检测是否获取过代币
  const checkTokenGet = useCallback(async () => {
    try {
      const result = await contract.methods.hasWithdrawn(account).call();
      setHasWithdrawn(result);
    } catch (error) {
      onMessage(error.message, 'error');
    }
  }, [contract, onMessage, account]);

  //进来直接获取一次
  useEffect(() => {
    getTokenTotal();
    getUnit();
    getContractBalance();
    getBalance();
    checkTokenGet();
  }, [getTokenTotal, getUnit, getContractBalance, getBalance, checkTokenGet]);

  //获取免费代币
  const withdrawFreeTokens = useCallback(async () => {
    setIsPending(true);
    try {
      await contract.methods.withdrawFreeTokens().send();
      setHasWithdrawn(true);
      onMessage('successfully withdraw!');
    } catch (e) {
      onMessage(e.message, 'error');
    } finally {
      getContractBalance();
      getBalance();
      getTokenTotal();
      setIsPending(false);
    }
  }, [contract, onMessage, getTokenTotal, getBalance, getContractBalance, setHasWithdrawn]);

  const items = [
    {
      key: 'Contract Address',
      label: 'Contract Address',
      children: getExplorerDom({ value: address }),
      span: 3,
    },
    {
      key: 'Account',
      label: 'Account',
      children: getExplorerDom({ value: account }),
      span: 3,
    },
    {
      key: 'Balance',
      label: 'Balance',
      children: (
        <div>
          <b>{balance}</b> {unit}
          {!hasWithdrawn && (
            <Button type="link" size="small" loading={isPending} onClick={withdrawFreeTokens}>
              withdrawFreeToken
            </Button>
          )}
        </div>
      ),
      span: 3,
    },
  ];

  return (
    <Card
      className={className}
      title={
        <>
          <DollarTwoTone className="mr-[5px]" />
          Ztachi Token
        </>
      }
      extra={
        <>
          Contract Balance:
          <b className="mr-[20px]">
            {contractBalance} {unit}
          </b>
          Token Supply:
          <b>
            {tokenTotal} {unit}
          </b>
        </>
      }
    >
      <Descriptions items={items} />
    </Card>
  );
};

export default Contract4;
