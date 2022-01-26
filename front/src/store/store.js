import { configureStore } from '@reduxjs/toolkit';
import darkmodeReducer from './darkmodeSlice.js';

export default configureStore({
  reducer: {
    darkmode: darkmodeReducer,
  },
});
