/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 21:29:04
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-01-03 21:37:41
 * @Description:
 */

import faker from 'faker/locale/en_US';
//年份
export const years = new Array(15).fill({}).map((d, i) => ({
  id: i,
  name: 2010 + i,
}));
//地区
export const region = new Array(11).fill({}).map((d, i) => ({
  id: i,
  name: faker.address.city(),
}));
