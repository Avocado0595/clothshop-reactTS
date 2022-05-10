import { ICartAction, ICartReducer } from "./cart.interface";
import CartActionTypes from "./cart.types";

const initialState = { hidden: true, itemList: [] };
const cartReducer = (
	state: ICartReducer = initialState,
	action: ICartAction
): ICartReducer => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART:
			return {
				...state,
				hidden: !state.hidden,
			};
		case CartActionTypes.ADD_ITEM:{
			const oldList = [...state.itemList];
			const existItem = oldList.findIndex(i=>i.id === action.payload.id);
			if(existItem === -1)
			{
				return {
				...state,
				itemList:[...state.itemList, {...action.payload, quantity: 1}]
				}
			}
			else{
				oldList[existItem].quantity+=1;
				return {
					...state,
					itemList:[... oldList]
					}
			}

		}
		case CartActionTypes.REDUCE_ITEM:{
			const oldList = [...state.itemList];
			const existItem = oldList.findIndex(i=>i.id === action.payload.id);
			if(existItem === -1)
			{
				return state;
			}
			else{
				if(oldList[existItem].quantity == 1)
					oldList.splice(existItem,1);
				else
					oldList[existItem].quantity-=1;
				return {
					...state,
					itemList:[... oldList]
					}
			}
		}
		case CartActionTypes.DELETE_ITEM:{
			const oldList = [...state.itemList];
			const existItem = oldList.findIndex(i=>i.id === action.payload.id);
			if(existItem === -1)
			{
				return state;
			}
			else{
				oldList.splice(existItem,1);
				return {
					...state,
					itemList:[... oldList]
				}
			}
		}
		default:
			return state;
	}
};

export default cartReducer;