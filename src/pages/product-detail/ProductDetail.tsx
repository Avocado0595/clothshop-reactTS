import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { addItem } from '../../redux/cart/cart.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectByProductId } from '../../redux/product/product.slice';
import './ProductDetail.scss';

const ProductDetail: FC = () => {
	const { productId } = useParams();
	const product = useAppSelector((state) =>
		selectByProductId(state, parseInt(productId ?? ''))
	);
	const dispatch = useAppDispatch();
	if (product)
		return (
			<Container className="product-detail">
				<img
					className="product-img"
					alt={product.name}
					src={product.imageUrl}
				/>
				<div className="product-info">
					<h3 className="product-name">{product.name}</h3>
					<p className="product-description">
						Description: {product.description}
					</p>
					<h4 className="product-price">Price: {product.price}$</h4>
					<div
						onClick={() =>
							dispatch(addItem({ ...product, quantity: 0 }))
						}
						className="product-addcart"
					>
						<p>ADD TO CART</p>
					</div>
				</div>
			</Container>
		);
	else return <h3>Not found!</h3>;
};

export default ProductDetail;
