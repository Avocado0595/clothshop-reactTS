import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
//const middleware = (getDefaultMiddleware)=>  [...getDefaultMiddleware(), sagaMiddleware];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware)=>  [...getDefaultMiddleware({thunk: false, serializableCheck: false,}), sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
