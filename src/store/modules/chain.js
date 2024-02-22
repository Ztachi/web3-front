/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-21 18:56:58
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-22 21:38:55
 * @Description: 链相关数据
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '@/api';

const SLICE_NAME = 'chain';

//获取所有链列表
export const fetchChainList = createAsyncThunk(`${SLICE_NAME}/fetchChainList`, async () => {
  const data = await api.COMMON_GET_CHAIN_LIST();
  return data;
});

export const chainSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    chainList: [], //链列表
    keywords: '', //查询关键词
  },
  reducers: {
    setKeywords: (state, { payload }) => {
      state.keywords = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChainList.fulfilled, (state, action) => {
      state.chainList = action.payload;
    });
  },
});

export const { setKeywords } = chainSlice.actions;

//获取链列表
export const getChainList = (state) => state[SLICE_NAME].chainList;
//获取查询关键词
export const getKeywords = (state) => state[SLICE_NAME].keywords;
//查询某一条链
export const getChainById = (state, chainId) =>
  state[SLICE_NAME].chainList.find((chain) => chain.chainId === chainId);
//通过名称、chain模糊查询某一些链
export const getChainByNameOrChain = (state, nameOrChain) => {
  if (nameOrChain) {
    return state[SLICE_NAME].chainList.filter(
      (chain) =>
        chain.chainId === +nameOrChain ||
        chain.name.toLocaleLowerCase().includes(nameOrChain.toLocaleLowerCase())
    );
  }
  return state[SLICE_NAME].chainList;
};

export default chainSlice.reducer;
