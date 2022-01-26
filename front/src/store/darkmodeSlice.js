import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

function setLocalStorage(isDark) {
  localStorage.setItem('isDark', isDark ? 'true' : 'false');
}

function setDocumentElementClassList(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const isDark = JSON.parse(localStorage.getItem('isDark') || 'false');
setLocalStorage(isDark);
setDocumentElementClassList(isDark);

export const toggle = createAsyncThunk(
  'darkmode/toggle',
  async (arg, thunkAPI) => {
    const { isDark } = thunkAPI.getState().darkmode;

    // Toggle darkmode, so let darkmode = !darkmode.
    setLocalStorage(!isDark);
    setDocumentElementClassList(!isDark);
  },
);

export const slice = createSlice({
  name: 'darkmode',
  initialState: { isDark },
  extraReducers: {
    [toggle.fulfilled]: (state, action) => {
      state.isDark = !state.isDark;
    },
  },
});

export default slice.reducer;
