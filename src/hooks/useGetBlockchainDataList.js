/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-25 19:07:44
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-28 18:49:59
 * @Description: 获取制定区块数据，以及它的上N个区块和与之对应的叔叔区块
 */
import { useContext, useRef, useState, useEffect } from 'react';
import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import { getBlockList } from '@/libs/block';

/**
 * @description: 获取指定范围区块链数据
 * @param {Number} chainId 当前链id，改变了重新获取
 * @param {Number} initBlockNumber 结束的区块号
 * @param {Number} blockNumber 往前追溯几个（包含结束的那个）
 * @return {Array} 区块链数据,是否正在获取中
 */
const useGetBlockchainDataList = (chainId, initBlockNumber, blockNumber = 3) => {
  const web3 = useContext(Web3Context);
  const [blockchainDataList, setBlockchainDataList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //缓存
  const cacheData = useRef({});
  if (!cacheData.current[chainId]) {
    cacheData.current[chainId] = {};
  }
  // console.log(blockList);

  useEffect(() => {
    // setBlockList(null);
    setIsFetching(true);
    async function getBlockListAsync() {
      //有叔叔区块的:1000 1500 2500 2518 2516
      const list = await getBlockList(
        web3.eth,
        blockNumber,
        initBlockNumber,
        cacheData.current[chainId]
      );
      console.log(list.map((item) => item.uncles.length));
      setBlockchainDataList(list);
    }
    getBlockListAsync().finally(() => {
      setIsFetching(false);
    });
  }, [web3.eth, initBlockNumber, blockNumber, chainId]);

  return { blockchainDataList, isFetching };
};
export default useGetBlockchainDataList;
