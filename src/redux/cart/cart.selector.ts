import { createSelector } from 'reselect'
import { IRootReducer } from '../rootReducer'

const selectCart = (state:IRootReducer) => state.cart;

export const selectCartItemList = createSelector(selectCart, items =>items.itemList);
export const selectCartItemCount = createSelector(selectCart, item=>item.itemList.reduce((s, cartItem)=>s+cartItem.quantity,0));
export const selectToggleCart = createSelector(selectCart, item=>item.hidden);
export const selectTotalPrice = createSelector(selectCart,item=>item.itemList.reduce((total,i)=>total+i.price*i.quantity,0))

