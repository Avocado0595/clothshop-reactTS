import './CartIcon.scss';
import cartIcon from '../../../asserts/shopping-cart.svg';
import { selectCartList } from '../../../redux/cart/cart.slice';

import { useAppSelector } from '../../../redux/hooks';
import { Dropdown } from 'react-bootstrap';

import CartMenu from '../cart-dropdown/CartMenu';
const CartIcon = () => {
	const numberOfItem = useAppSelector(
		(state) => selectCartList(state).length
	);
	return (
		<Dropdown>
			<Dropdown.Toggle
				style={{
					backgroundColor: 'unset',
					border: 'none',
					outline: 'none',
					boxShadow: 'none',
				}}
			>
				<div className="cart-count">
					<span className="d-block">{numberOfItem}</span>
				</div>
				<img alt="cart" className="cart-icon" src={cartIcon} />
			</Dropdown.Toggle>
			<CartMenu />
		</Dropdown>
	);
};

export default CartIcon;
