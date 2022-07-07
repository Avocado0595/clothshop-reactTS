import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col } from 'react-bootstrap';
import IProduct from '../../interfaces/IProduct';
import { addItem } from '../../redux/cart/cart.slice';
import { useAppDispatch } from '../../redux/hooks';
import './PreviewItem.scss';

const PreviewItem: FC<{ item: IProduct }> = ({ item }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (
		<Col className="preview-item" key={item.id}>
			<div className="item-layout">
				<img
					onClick={() => navigate(`/${item.collectionId}/${item.id}`)}
					className="item-img"
					src={item.imageUrl}
				/>
				<div
					className="item-modal"
					onClick={() => navigate(`/${item.collectionId}/${item.id}`)}
				></div>
				<div
					onClick={() => dispatch(addItem({ ...item, quantity: 0 }))}
					className="item-addcart"
				>
					<p>ADD TO CART</p>
				</div>
			</div>
			<div className="item-info">
				<p className="item-info--name">{item.name}</p>
				<div className="item-info--price">${item.price}</div>
			</div>
		</Col>
	);
};

export default PreviewItem;
