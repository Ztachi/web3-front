/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-25 18:59:23
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-29 17:04:40
 * @Description: 区块相关数据处理
 */
/**
 * @description: 格式化区块信息
 * @param {Object} blockObj 区块对象
 * @return {Object} 格式化之后的对象
 */
export function formatBlockInformation(blockObj) {
  if (!blockObj) return null;

  const obj = {};
  Object.entries(blockObj).forEach(([key, value]) => {
    //bigint类型就转换为字符串
    if (typeof value === 'bigint') {
      obj[key] = value.toString();
    } else {
      obj[key] = value;
    }
  });
  return obj;
}

/**
 * @description: 获取区块信息
 * @param {Object} eth  ETH对象
 * @param {Number|String} blockNumber 区块号。可以是数字，也可以是哈希值
 * @param {Boolean} returnTransactionObjects 是否返回完整的交易信息
 * @return {Object} 区块数据对象
 */
export async function getBlock(eth, blockNumber = 'latest', returnTransactionObjects = false) {
  const block = await eth.getBlock(blockNumber, returnTransactionObjects);
  return formatBlockInformation(block);
}

/**
 * @description: 获取指定区块叔叔区块信息
 * @param {Object} eth ETH对象
 * @param {Number|String} blockNumber 区块号。可以是数字，也可以是哈希值
 * @param {Boolean} returnTransactionObjects 是否返回完整的交易信息
 * @return {Array} [叔叔区块数据列表,叔叔区块数]
 */
export async function getUncleBlock(eth, blockNumber = 'latest') {
  //先获取叔叔区块数
  const uncleBlockNumber = Number.parseInt(
    (await eth.getBlockUncleCount(blockNumber)).toString(),
    10
  );
  //没有就直接返回
  if (uncleBlockNumber === 0) {
    return [[], 0];
  }
  //再依次获取叔叔区块
  const getUncleBlockList = new Array(uncleBlockNumber)
    .fill()
    .map((d, i) => eth.getUncle(blockNumber, i));
  const uncleBlockList = [];
  for await (const uncleBlock of getUncleBlockList) {
    uncleBlockList.push(formatBlockInformation(uncleBlock));
  }

  return [uncleBlockList, uncleBlockNumber];
}

/**
 * @description: 获取完整区块，包含当前区块和他的叔叔区块
 * @param {Object} eth ETH对象
 * @param {Number|String} blockNumber 区块号。可以是数字，也可以是哈希值
 * @return {Object} 完整区块信息,多了个uncles属性存放叔叔区块
 */
export async function getCompleteBlock(eth, blockNumber = 'latest') {
  //获取当前区块
  const block = await getBlock(eth, blockNumber);
  if (!block) return null;
  //获取当前区块的叔叔区块
  const [uncles, uncleBlockNumber] = await getUncleBlock(eth, blockNumber);
  block.uncles = uncles;
  block.uncleBlockNumber = uncleBlockNumber;
  return block;
}

/**
 * @description: 返回（当前+往前）多少个区块对象信息
 * @param {Object} eth ETH对象
 * @param {Number} number 往前多少个
 * @param {Number|String} blockNumber 区块号。可以是数字，也可以是哈希值
 * @param {Object} cacheData 缓存数据
 * @param {Array} blockList 初始列表
 * @return {Array} 返回完整数组
 */
export async function getBlockList(
  eth,
  number = 1,
  blockNumber = 'latest',
  cacheData = {},
  blockList = []
) {
  //至少获取当前这个。或者获取到最前端的区块
  if (number < 1 || blockNumber < 0) return blockList;

  //获取当前区块和他的叔叔区块
  let currentCompleteBlock = null;

  //有缓存就用缓存
  if (cacheData[blockNumber] && cacheData[blockNumber]) {
    currentCompleteBlock = cacheData[blockNumber];
  } else {
    //没有就重新获取
    currentCompleteBlock = await getCompleteBlock(eth, blockNumber);

    cacheData[blockNumber] = currentCompleteBlock;
  }
  console.log('fetch data', blockNumber, currentCompleteBlock?.number, number, blockList);
  //获取上一个他的区块
  const prev = await getBlockList(
    eth,
    number - 1,
    currentCompleteBlock ? currentCompleteBlock.number - 1 : blockNumber - 1,
    cacheData,
    currentCompleteBlock ? [currentCompleteBlock].concat(blockList) : blockList
  );
  return prev;
}

export default formatBlockInformation;
