import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
  } from 'redux-persist'
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
},);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
