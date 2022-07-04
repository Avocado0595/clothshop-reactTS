import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col } from 'react-bootstrap';
import IProduct from '../../interfaces/IProduct';
import { addItem } from '../../redux/cart/cart.slice';
import { useAppDispatch } from '../../redux/hooks';
import './PreviewItem.scss';

const PreviewItem: FC<{ item: IProduct, collection: string }> = ({ item, collection }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	return (
		<Col className="preview-item" key={item.id}>
			<div
				className="item-img"
				style={{ backgroundImage: `url(${item.imageUrl})` }}
			>
				<div
					className="item-modal"
					onClick={() => navigate(`/${collection}/${item.id}`)}
				></div>
				<div
					onClick={() => dispatch(addItem({ ...item, quantity: 0 }))}
					className="item-addcart"
				>
					<p>ADD TO CART</p>
				</div>
			</div>
			<div className="item-info">
				<div className="item-info--name">{item.name}</div>
				<div className="item-info--price">${item.price}</div>
			</div>
		</Col>
	);
};

export default PreviewItem;
