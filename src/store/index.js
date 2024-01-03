/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:02:37
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-01-03 00:02:37
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit';
import counter from './modules/counter';

export default configureStore({
  reducer: {
    counter,
  },
});
