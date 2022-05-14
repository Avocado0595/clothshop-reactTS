import { combineReducers } from 'redux';
import { ICartReducer } from './cart/cart.interface';
import cartReducer from './cart/cart.reducer';
import userReducer, { IUserReducer } from './user/user.reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import directoryReducer from './directory/directory.reducer';
import { IDirectoryReducer } from './directory/directory.interface';
export interface IRootReducer {
	user: IUserReducer;
	cart: ICartReducer;
	directory: IDirectoryReducer;
}
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};
const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	directory: directoryReducer,
});

export default persistReducer(persistConfig, rootReducer);
