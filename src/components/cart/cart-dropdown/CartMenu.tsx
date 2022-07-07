import CartItem from '../cart-item/CartItem';
import './CartMenu.scss';
import { useNavigate } from 'react-router-dom';
import cartEmpty from '../../../asserts/empty-cart.svg';
import { useAppSelector } from '../../../redux/hooks';
import { Dropdown } from 'react-bootstrap';
const CartdDropdown = () => {
	const itemList = useAppSelector((state) => state.cart.itemList);
	const navigate = useNavigate();
	const handleCheckout = () => {
		navigate('/checkout');
	};
	return (
		<Dropdown.Menu className="cart-dropdown">
			<div className="cart-list">
				{itemList.length === 0 ? (
					<div>
						<img
							alt="empty"
							className="cart-empty"
							src={cartEmpty}
						></img>
						<p>You don't have any product in cart.</p>
					</div>
				) : (
					<div>
						{itemList.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>
				)}
			</div>
			{itemList.length !== 0 ? (
				<button onClick={handleCheckout} className="cart-btn">
					CHECK OUT
				</button>
			) : null}
		</Dropdown.Menu>
	);
};

export default CartdDropdown;
