import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import {
	addItem,
	deleteItem,
	removeItem,
	selectCartList,
	selectTotalPrice,
} from '../../redux/cart/cart.slice';
import trashIcon from '../../asserts/trash.svg';
import './CartCheckout.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const CartCheckout: FC = () => {
	const cartList = useAppSelector((state) => selectCartList(state));
	const totalPrice = useAppSelector((state) => selectTotalPrice(state));
	const dispatch = useAppDispatch();
	if (cartList.length !== 0)
		return (
			<div>
				<h3>Checkout</h3>
				<table>
					<tr>
						<th>Product</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Remove</th>
					</tr>
					{cartList.map((item) => (
						<tr>
							<td>
								<img
									alt="product image"
									className="product-img"
									src={item.imageUrl}
								/>
							</td>
							<td>{item.name}</td>
							<td>
								<div className="quantity-column">
									<button
										className="quantity-btn inc"
										onClick={() => dispatch(addItem(item))}
									>
										+
									</button>
									<p>{item.quantity}</p>
									<button
										onClick={() =>
											dispatch(removeItem(item))
										}
										className="quantity-btn dec"
									>
										-
									</button>
								</div>
							</td>
							<td>{item.price * item.quantity}$</td>
							<td>
								<ReactSVG
									className="icon-trash"
									src={trashIcon}
									onClick={() => dispatch(deleteItem(item))}
								/>
							</td>
						</tr>
					))}
				</table>
				<h3>TOTAL: {totalPrice}$</h3>
			</div>
		);
	else
		return (
			<h5>
				You have nothing in your cart. Go <a href="/shop">Shop page</a>{' '}
				to get some!
			</h5>
		);
};

export default CartCheckout;
