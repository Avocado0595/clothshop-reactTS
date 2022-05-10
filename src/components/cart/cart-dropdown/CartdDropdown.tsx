
import { FC } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import IProduct from '../../../interfaces/IProduct';
import { IRootReducer } from '../../../redux/rootReducer';
import CartItem from '../cart-item/CartItem';
import './CartDropdown.scss'
import { useNavigate } from "react-router-dom";
import { ICartItem } from '../../../redux/cart/cart.interface';
import { selectCartItemList } from '../../../redux/cart/cart.selector';
import { Dispatch } from 'redux';
import { toggleCart } from '../../../redux/cart/cart.action';
const CartdDropdown:FC<{itemList: Array<ICartItem>, dispatch: Dispatch}> = ({itemList, dispatch})=>{
	const navigate = useNavigate();
	const handleCheckout =()=>{
		dispatch(toggleCart());//shorthand for dispatch
		navigate('/checkout');
	}
    return (
    <div className='cart-dropdown'>
	<div className='cart-list'>
		{itemList.length===0?<div>You don't have any product in cart.</div>:
		itemList.map(item=>(<CartItem item={item}/>))}
	</div>
	<button onClick={handleCheckout} className='cart-btn'>CHECK OUT</button>

</div>
)
}

const mapStateToProps = (state:IRootReducer)=>({
	itemList: selectCartItemList(state)
})
// const mapDispatchToProp = (dispatch: Dispatch)=>({
// 	toggleCart: ()=>dispatch(toggleCart())
// })
export default connect(mapStateToProps)(CartdDropdown);