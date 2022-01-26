import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

function setDarkMode(isDark) {
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
  async (arg, thunkAPI) => {
    const { isDark } = thunkAPI.getState().darkmode;

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
      [toggle.fulfilled]: (state, action) => {
        state.isDark = !state.isDark;
      },
    },
  });
})();

export default slice.reducer;
