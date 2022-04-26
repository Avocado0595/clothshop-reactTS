import { combineReducers } from 'redux';
import userReducer, { IUserReducer } from './user/user.reducer';
export interface IRootReducer {
	user: IUserReducer;
}
export default combineReducers({
	user: userReducer,
});
