/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-03-03 12:34:34
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-05 19:16:47
 * @Description: 全局的一些工具函数
 */

import dayjs from 'dayjs';
import { ETHEREUM_MAINNET_CHAIN_ID, ETHEREUM_UNITS } from '@/const';

/**
 * @description: 修复以太币格式化之后0返回0.
 * @param {String} str 格式化之后的字符串
 * @return {String} 修复后的字符串
 */
export function fixedZeroEth(str) {
  return str === '0.' ? 0 : str;
}

/**
 * @description: 获取余额货币后缀
 * @param {Object} chain 当前链信息
 * @return {String} 后缀单位
 */
export function getBalanceUnits(chain) {
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

/**
 * @description: 格式化文件大小
 * @param {Number} bytes 文件比特数
 * @return {String} 格式化之后的样式
 */
export function formatFileSize(bytes) {
  bytes = +bytes;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  while (bytes >= 1024 && units.length > 1) {
    bytes /= 1024;
    units.shift();
  }
  return Number(bytes.toFixed(2)) + units[0];
}

/**
 * @description: 格式化时间戳
 * @param {string|Number} timestamp 时间戳
 * @return {String} 格式化之后的时间
 */
export function formatTimestamp(timestamp) {
  return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
}

export function textTransition(value, transformValue) {
  if (typeof value === 'string') {
    return value;
  }
  return transformValue();
}

export default textTransition;
