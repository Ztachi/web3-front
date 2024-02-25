/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-25 19:07:44
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-25 20:51:40
 * @Description: 获取制定区块数据，以及它的上N个区块和与之对应的叔叔区块
 */
import { useContext, useState, useEffect } from 'react';
import { Web3Context } from '@/libs/wallet/components/Web3Provider';

import { getBlockList } from '@/libs/block';

const useGetBlockchainDataList = (initBlockNumber) => {
  const web3 = useContext(Web3Context);
  const [blockList, setBlockList] = useState(null);
  // console.log(blockList);

  useEffect(() => {
    setBlockList(null);
    async function getBlockListAsync() {
      //有叔叔区块的:1000 1500 2500 2518 2516
      const list = await getBlockList(web3.eth, 3, initBlockNumber);
      console.log(list.map((item) => item.uncles.length));
      setBlockList(list);
    }
    getBlockListAsync();
  }, [web3.eth, setBlockList, initBlockNumber]);

  return blockList;
};
export default useGetBlockchainDataList;
