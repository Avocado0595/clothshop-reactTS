import { FC } from 'react';
import './CartIcon.scss';
import cartIcon from '../../../asserts/shopping-cart.png';
import { selectCartList, toggleCart } from '../../../redux/cart/cart.slice';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
const CartIcon: FC = () => {
	const numberOfItem = useAppSelector(
		(state) => selectCartList(state).length
	);
	const dispatch = useAppDispatch();
	return (
		<a onClick={() => dispatch(toggleCart())} className="header-item cart">
			<div className="cart-count">{numberOfItem}</div>
			<img alt="cart" className="cart-icon" src={cartIcon} />
		</a>
	);
};

export default CartIcon;
