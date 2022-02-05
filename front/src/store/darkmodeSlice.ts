import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

function setDarkMode(isDark: any) {
  // set localStorage.
  localStorage.setItem('isDark', isDark ? 'true' : 'false');

  // set documentElement's classList.
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const toggle = createAsyncThunk(
  'darkmode/toggle',
  async (_arg, thunkAPI) => {
    const { isDark } = (thunkAPI as any).getState().darkmode;

    // Toggle darkmode, so let darkmode = !darkmode.
    setDarkMode(!isDark);
  },
);

export const slice = (() => {
  const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');
  setDarkMode(isDark);

  return createSlice({
    name: 'darkmode',
    initialState: { isDark },
    extraReducers: {
      [toggle.fulfilled as any]: (state: any, _action: any) => {
        state.isDark = !state.isDark;
      },
    },
  } as any);
})();

export default slice.reducer;
