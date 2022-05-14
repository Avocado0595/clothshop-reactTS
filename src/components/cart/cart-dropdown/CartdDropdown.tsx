import { FC } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import IProduct from '../../../interfaces/IProduct';
import { IRootReducer } from '../../../redux/rootReducer';
import CartItem from '../cart-item/CartItem';
import './CartDropdown.scss';
import { useNavigate } from 'react-router-dom';
import { ICartItem } from '../../../redux/cart/cart.interface';
import { selectCartItemList } from '../../../redux/cart/cart.selector';
import { Dispatch } from 'redux';
import { toggleCart } from '../../../redux/cart/cart.action';
import cartEmpty from '../../../asserts/empty-cart.png';
const CartdDropdown: FC<{ itemList: Array<ICartItem>; dispatch: Dispatch }> = ({
	itemList,
	dispatch,
}) => {
	const navigate = useNavigate();
	const handleCheckout = () => {
		dispatch(toggleCart()); //shorthand for dispatch
		navigate('/checkout');
	};
	return (
		<div className="cart-dropdown">
			<div className="cart-list">
				{itemList.length === 0 ? (
					<div><p>You don't have any product in cart.</p>
						<img className='cart-empty' src={cartEmpty}></img>
					</div>
				) : (
					itemList.map((item) => <CartItem item={item} />)
				)}
			</div>
			{itemList.length !== 0?<button onClick={handleCheckout} className="cart-btn">
				CHECK OUT
			</button>:null}
		</div>
	);
};

const mapStateToProps = (state: IRootReducer) => ({
	itemList: selectCartItemList(state),
});
// const mapDispatchToProp = (dispatch: Dispatch)=>({
// 	toggleCart: ()=>dispatch(toggleCart())
// })
export default connect(mapStateToProps)(CartdDropdown);
