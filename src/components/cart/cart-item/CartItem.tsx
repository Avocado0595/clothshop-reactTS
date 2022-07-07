import { Dropdown } from 'react-bootstrap';
import { ICartItem } from '../../../redux/cart/cart.slice';
import './CartItem.scss';
const CartItem = (props: { item: ICartItem }) => {
	const { item } = props;
	return (
		<Dropdown.Item key={item.id}>
			<img alt="item" className="cart-item-img" src={item.imageUrl}></img>
			<div className="cart-item-info">
				<p className="cart-item-name">{item.name}</p>
				<p className="cart-item-price">
					{item.quantity} &times; {item.price}$
				</p>
			</div>
		</Dropdown.Item>
	);
};

export default CartItem;
