import { FC } from 'react';
import CartItem from '../cart-item/CartItem';
import './CartDropdown.scss';
import { useNavigate } from 'react-router-dom';
import { toggleCart } from '../../../redux/cart/cart.slice';
import cartEmpty from '../../../asserts/empty-cart.png';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
const CartdDropdown: FC = () => {
	const itemList = useAppSelector((state) => state.cart.itemList);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleCheckout = () => {
		dispatch(toggleCart());
		navigate('/checkout');
	};
	return (
		<div className="cart-dropdown">
			<div className="cart-list">
				{itemList.length === 0 ? (
					<div>
						<p>You don't have any product in cart.</p>
						<img className="cart-empty" src={cartEmpty}></img>
					</div>
				) : (
					itemList.map((item) => <CartItem item={item} />)
				)}
			</div>
			{itemList.length !== 0 ? (
				<button onClick={handleCheckout} className="cart-btn">
					CHECK OUT
				</button>
			) : null}
		</div>
	);
};

export default CartdDropdown;
