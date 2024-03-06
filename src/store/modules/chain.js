/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-21 18:56:58
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-24 19:53:10
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

//获取链列表
export const getChainList = (state) => state[SLICE_NAME].chainList;
//获取当前链
export const getCurrentChain = (state) => state[SLICE_NAME].currentChain;
//获取查询关键词
export const getKeywords = (state) => state[SLICE_NAME].keywords;
//查询某一条链
export const getChainById = (state, chainId, chainList) =>
  (chainList || state[SLICE_NAME].chainList).find((chain) => chain.chainId === chainId);
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

export const chainSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    chainList: [], //链列表
    keywords: '', //查询关键词
    currentChain: null, //当前链对象
    chainId: null, //当前链ID
  },
  reducers: {
    //设置搜索关键词
    setKeywords: (state, { payload }) => {
      state.keywords = payload;
    },
    //设置当前链
    setCurrentChain: (state, { payload }) => {
      state.chainId = payload;

      if (state.chainList.length) {
        state.currentChain = getChainById(state, payload, state.chainList);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChainList.fulfilled, (state, action) => {
      //存储所有链
      state.chainList = action.payload;
      //设置当前链
      if (!state.currentChain && state.chainId) {
        state.currentChain = getChainById(state, state.chainId, state.chainList);
      }
    });
  },
});

export const { setKeywords, setCurrentChain } = chainSlice.actions;

export default chainSlice.reducer;
