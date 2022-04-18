import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';

/******************************************************************************
 * Constant values.
 *****************************************************************************/
const SLICE_NAME = 'themeMode';
const MODE_ITEM_KEY = `store-${SLICE_NAME}-mode`;

/******************************************************************************
 * State types
 *****************************************************************************/
export enum themeModeState {
  LIGHT = 'light',
  DARK = 'dark',
}

/******************************************************************************
 * Main part
 *****************************************************************************/
const setThemeMode = (theme: themeModeState): themeModeState => {
  const root = document.documentElement;

  if (theme === themeModeState.LIGHT) {
    localStorage.setItem(MODE_ITEM_KEY, themeModeState.LIGHT);
    root.classList.remove('dark');
  } else {
    localStorage.setItem(MODE_ITEM_KEY, themeModeState.DARK);
    root.classList.add('dark');
  }

  return theme;
};

const initialState = ((): themeModeState => {
  const mode =
    localStorage.getItem(MODE_ITEM_KEY) === themeModeState.DARK
      ? themeModeState.DARK
      : themeModeState.LIGHT;

  return setThemeMode(mode);
})();

export const themeModeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLightMode: (_state: themeModeState) => {
      return setThemeMode(themeModeState.LIGHT);
    },
    setDarkMode: (_state: themeModeState) => {
      return setThemeMode(themeModeState.DARK);
    },
  },
});

/******************************************************************************
 * Export others
 *****************************************************************************/
export const { setLightMode, setDarkMode } = themeModeSlice.actions;

export const selectThemeMode = (state: RootState) => state.themeMode;

export default themeModeSlice.reducer;
