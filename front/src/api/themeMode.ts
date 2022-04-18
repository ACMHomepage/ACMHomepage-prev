import { useCallback } from 'react';
import { useDispatch, useSelector } from '../hooks';

import {
  setDarkMode,
  setLightMode,
  selectThemeMode,
  themeModeState,
} from '../store/themeModeSlice';

export const useThemeMode = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);

  const set = useCallback(
    (theme: themeModeState) => {
      if (theme === 'light') {
        if (themeMode !== themeModeState.LIGHT) {
          dispatch(setLightMode());
        }
      } else {
        if (themeMode !== themeModeState.DARK) {
          dispatch(setDarkMode());
        }
      }
    },
    [themeMode],
  );

  const setNext = useCallback(() => {
    if (themeMode === 'light') {
      dispatch(setDarkMode());
    } else {
      dispatch(setLightMode());
    }
  }, [themeMode]);

  return { set, setNext, val: themeMode };
};
