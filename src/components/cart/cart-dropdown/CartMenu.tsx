import { FC } from 'react';
import CartItem from '../cart-item/CartItem';
import './CartMenu.scss';
import { useNavigate } from 'react-router-dom';
import cartEmpty from '../../../asserts/empty-cart.png';
import { useAppSelector } from '../../../redux/hooks';
import { DropdownMenu } from 'reactstrap';
const CartdDropdown: FC = () => {
	const itemList = useAppSelector((state) => state.cart.itemList);
	const navigate = useNavigate();
	const handleCheckout = () => {
		navigate('/checkout');
	};
	return (
		<DropdownMenu className="cart-dropdown">
			<div className="cart-list">
				{itemList.length === 0?<div>
						<p>You don't have any product in cart.</p>
						<img className="cart-empty" src={cartEmpty}></img>
					</div>:
					<div>
						{itemList.map((item) => <CartItem key={item.id} item={item} />)}
						</div>}
			</div>
			{itemList.length !== 0 ? (
				<button onClick={handleCheckout} className="cart-btn">
					CHECK OUT
				</button>
			) : null}
		</DropdownMenu>
	);
};

export default CartdDropdown;
