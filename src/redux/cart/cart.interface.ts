import IProduct from "../../interfaces/IProduct";
import CartActionTypes from "./cart.types";

export interface ICartItem extends IProduct{
    quantity: number;
}

export interface ICartReducer{
    hidden:boolean,
    itemList: Array<ICartItem>
}

export interface ICartAction{
    type: CartActionTypes;
	payload: any;
}


