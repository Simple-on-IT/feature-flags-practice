import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { giftsApi } from './giftsApi';
import { featureFlagsApi } from './featureFlagsApi';

export const store = configureStore({
  reducer: {
    [giftsApi.reducerPath]: giftsApi.reducer,
    [featureFlagsApi.reducerPath]: featureFlagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(giftsApi.middleware, featureFlagsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;