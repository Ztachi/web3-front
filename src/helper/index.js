/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-03-03 12:34:34
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-03 12:41:09
 * @Description: 全局的一些工具函数
 */

export function textTransition(value, transformValue) {
  if (typeof value === 'string') {
    return value;
  }
  return transformValue();
}

export default textTransition;
