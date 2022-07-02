import { FC, useState } from 'react';
import './CartIcon.scss';
import cartIcon from '../../../asserts/shopping-cart.png';
import { selectCartList } from '../../../redux/cart/cart.slice';

import { useAppSelector } from '../../../redux/hooks';
import { Dropdown} from 'react-bootstrap';

import CartMenu from '../cart-dropdown/CartMenu';
const CartIcon: FC = () => {
	const [dropState, setDropDownState]= useState({dropdownOpen:false})
	const numberOfItem = useAppSelector(
		(state) => selectCartList(state).length
	);
	const toggle = ()=> {
		setDropDownState(prevState => ({dropdownOpen: !prevState.dropdownOpen}))
	};

	return (
		<Dropdown>
        <Dropdown.Toggle>
			<div className="cart-count">{numberOfItem}</div>
			<img alt="cart" className="cart-icon" src={cartIcon} />
        </Dropdown.Toggle>
		<CartMenu/>
      </Dropdown>
	);
};

export default CartIcon;
