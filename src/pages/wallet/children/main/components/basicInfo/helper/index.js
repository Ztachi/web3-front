import { ETHEREUM_MAINNET_CHAIN_ID, ETHEREUM_UNITS } from '@/const';

/**
 * @description: 获取余额货币后缀
 * @param {Object} chain 当前链信息
 * @return {String} 后缀单位
 */
export default function getBalanceUnits(chain) {
  if (!chain) return;
  const {
    nativeCurrency: { symbol },
    name,
  } = chain;
  if (symbol.toLocaleUpperCase() === ETHEREUM_UNITS) {
    if (chain.chainId !== ETHEREUM_MAINNET_CHAIN_ID) {
      return `${name}${symbol}`;
    }
  }
  return symbol;
}
