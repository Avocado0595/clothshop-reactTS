import { ReactSVG } from 'react-svg';
import {
	addItem,
	clearCart,
	deleteItem,
	removeItem,
	selectCartList,
	selectTotalPrice,
} from '../../redux/cart/cart.slice';
import trashIcon from '../../asserts/trash.svg';
import './CartCheckout.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { createUserCart } from '../../firebase/firebase.utils';
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

const CartCheckout = () => {
	const cartList = useAppSelector((state) => selectCartList(state));
	const totalPrice = useAppSelector((state) => selectTotalPrice(state));
	const user = getAuth().currentUser;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	//modal
	const [modalState, setModalState] = useState({ modal: false });
	const toggle = () => setModalState({ modal: !modalState.modal });
	const commitCheckout = () => {
		modalState.modal ? dispatch(clearCart()) : null;
	};
	const handleCheckout = async () => {
		if (!user) {
			navigate('/signin');
		} else {
			toggle();
			await createUserCart(
				user.uid,
				cartList.map((c) => ({
					id: c.id,
					name: c.name,
					price: c.price,
					quantity: c.quantity,
				}))
			);
		}
	};
	if (cartList.length !== 0)
		return (
			<Container>
				<h3>Checkout</h3>
				<Table className="responsive striped">
					<thead>
						<tr>
							<th>Product</th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{cartList.map((item) => (
							<tr key={item.id}>
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
											onClick={() =>
												dispatch(addItem(item))
											}
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
										onClick={() =>
											dispatch(deleteItem(item))
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<h3>Total: {totalPrice}$</h3>
				<Button onClick={handleCheckout}>Checkout here</Button>
				<Modal show={modalState.modal}>
					<ModalHeader>Checkout</ModalHeader>
					<ModalBody>
						Click "Agree" and your cart will be waiting for ship.
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={toggle}>
							Cancel
						</Button>{' '}
						<Button color="primary" onClick={commitCheckout}>
							Agree
						</Button>{' '}
					</ModalFooter>
				</Modal>
			</Container>
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
