/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-03 00:07:06
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-01-03 00:07:18
 * @Description:
 */
import { createSlice } from '@reduxjs/toolkit';

export const counter = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counter.actions;

export default counter.reducer;
