/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-12 17:32:45
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-21 18:57:10
 * @Description:
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const wallet = createSlice({
  name: 'wallet',
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  // extraReducers(builder) {
  //   // builder
  //     // .addCase(fetchPosts.pending, (state, action) => {
  //     // })
  //     // .addCase(fetchUsers.fulfilled, (state, action) => {
  //     //   state.userInfo = action.payload;
  //     // });
  //   // .addCase(fetchPosts.rejected, (state, action) => {
  //   // });
  // },
});

export const { setUserInfo } = wallet.actions;

//获取用户信息
export const getUserInfo = (fetchFn) => async (dispatch) => {
  const data = await fetchFn();

  dispatch(setUserInfo(data));
};

export const connectWallet = createAsyncThunk('wallet/connectWallet', async (fetchFn) => {
  const data = await fetchFn();
  return data;
});

export default wallet.reducer;
