import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
// ...

export const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import rootReducer from './rootReducer';
// import { persistStore } from 'redux-persist';
// const middlewares = [logger];

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// export const persistor = persistStore(store);
