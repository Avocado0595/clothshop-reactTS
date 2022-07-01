import { combineReducers } from '@reduxjs/toolkit';
import collectionSlice from './collection/collection.slice';
import userSlice from './user/user.slice';
import productSlice from './product/product.slice';
import cartSlice from './cart/cart.slice';
//import authSlice from './auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	user: userSlice,
	collection: collectionSlice,
	product: productSlice,
	cart: cartSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)
export default persistedReducer;
