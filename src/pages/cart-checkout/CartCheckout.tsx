import { FC, useState } from 'react';
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
import { selectUser } from '../../redux/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { createUserCart } from '../../firebase/firebase.utils';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const CartCheckout: FC = () => {
	const cartList = useAppSelector((state) => selectCartList(state));
	const totalPrice = useAppSelector((state) => selectTotalPrice(state));
	const user = useAppSelector((state)=>selectUser(state));
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	//modal
	const [modalState, setModalState] = useState({modal: false});
	const toggle = ()=>setModalState({modal: !modalState.modal});
	const commitCheckout = ()=>{
		modalState.modal?dispatch(clearCart()):null;
	}
	const handleCheckout = async()=>{
		if(!user){
			navigate('/signin');
		}
		else{
			await createUserCart(user.uid, cartList.map((c)=>({id: c.id, name: c.name, price: c.price, quantity:c.quantity})))
			toggle();
		}
	}
	if (cartList.length !== 0)
		return (
			<div>
				<h3>Checkout</h3>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{cartList.map((item, i) => (
							<tr key={i}>
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
				</table>
				<h3>TOTAL: {totalPrice}$</h3>
				<button onClick={handleCheckout}>CHECK OUT HERE</button>
				<Modal isOpen={modalState.modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Checkout done.</ModalHeader>
          <ModalBody>
            Yayy! Your cart is waiting for ship.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={commitCheckout}>I got it!</Button>{' '}
          </ModalFooter>
        </Modal>

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
