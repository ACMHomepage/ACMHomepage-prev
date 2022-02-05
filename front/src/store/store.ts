import { configureStore } from '@reduxjs/toolkit';
import darkmodeReducer from './darkmodeSlice';

export default configureStore({
  reducer: {
    darkmode: darkmodeReducer,
  },
});
