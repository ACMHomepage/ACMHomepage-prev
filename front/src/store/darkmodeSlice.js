import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');

export const toggle = createAsyncThunk('darkmode/toggle', async (arg, thunkAPI) => {
  const { isDark } = thunkAPI.getState().darkmode;
  if (isDark) {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
});

export const slice = createSlice({
  name: 'darkmode',
  initialState: { isDark },
  extraReducers: {
    [toggle.fulfilled]: (state, action) => {
      state.isDark = !state.isDark;
    }
  }
});

export default slice.reducer;
