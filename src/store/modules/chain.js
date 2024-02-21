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
    chainList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChainList.fulfilled, (state, action) => {
      state.chainList = state.chainList.concat(action.payload);
    });
  },
});

//获取链列表
export const getChainList = (state) => state[SLICE_NAME].chainList;
//查询某一条链
export const getChainById = (state, chainId) =>
  state[SLICE_NAME].chainList.find((chain) => chain.chainId === chainId);

export default chainSlice.reducer;
