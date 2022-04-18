import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import themeModeSlice from './themeModeSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    themeMode: themeModeSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
