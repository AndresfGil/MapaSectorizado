import { mapSlice } from './maps';
import { authSlice } from './auth';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    map: mapSlice.reducer,
  },
});