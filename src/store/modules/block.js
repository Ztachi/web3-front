import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'block';

//获取最新区块
export const getNewBlock = (state) => state[SLICE_NAME].newBlock;

export const blockSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    newBlock: null, //最新区块
  },
  reducers: {
    setNewBlock: (state, { payload }) => {
      state.newBlock = payload;
    },
  },
});

export const { setNewBlock } = blockSlice.actions;

export default blockSlice.reducer;
