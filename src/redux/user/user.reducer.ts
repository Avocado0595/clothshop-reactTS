import IUser from '../../interfaces/IUser';
import UserActionTypes from './user.types';

export interface IAction {
	type: UserActionTypes;
	payload: any;
}
export interface IUserReducer {
	currentUser: IUser | null;
}
const initialState = { currentUser: null };
const userReducer = (
	state: IUserReducer = initialState,
	action: IAction
): IUserReducer => {
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload as IUser,
			};
		case UserActionTypes.CLEAR_CURRENT_USER:
			return {
				...state,
				currentUser: null,
			};
		default:
			return state;
	}
};

export default userReducer;
