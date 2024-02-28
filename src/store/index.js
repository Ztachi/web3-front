/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:02:37
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-23 21:22:56
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit';
import counter from './modules/counter';
import wallet from './modules/wallet';
import chain from './modules/chain';
import block from './modules/block';

export default configureStore({
  reducer: {
    counter,
    wallet,
    chain,
    block,
  },
});
