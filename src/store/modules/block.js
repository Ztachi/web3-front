/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-29 11:49:40
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-01 11:15:47
 * @Description: 区块相关
 */
import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'block';

//获取最新区块
export const getNewBlock = (state) => state[SLICE_NAME].newBlock;
//获取最新区块号
export const getNewBlockNumber = (state) => state[SLICE_NAME].newBlockNumber;

export const blockSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    newBlock: null, //最新区块
    newBlockNumber: 0, //最新区块号
  },
  reducers: {
    setNewBlock: (state, { payload }) => {
      state.newBlock = payload;
      state.newBlockNumber = +payload.number;
    },
    setNewBlockNumber: (state, { payload }) => {
      state.newBlockNumber = payload;
    },
  },
});

export const { setNewBlockNumber, setNewBlock } = blockSlice.actions;

export default blockSlice.reducer;
