import { FC } from 'react';
import { DropdownItem } from 'reactstrap';
import { ICartItem } from '../../../redux/cart/cart.slice';
import './CartItem.scss';
const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	return (
		<DropdownItem key={item.id}>
			<img
				alt="item image"
				className="cart-item-img"
				src={item.imageUrl}
			></img>
			<div className="cart-item-info">
				<p className="cart-item-name">{item.name}</p>
				<p className="cart-item-price">
					{item.quantity} &times; {item.price}$
				</p>
			</div>
		</DropdownItem>
	);
};

export default CartItem;
