import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { addItem } from '../../redux/cart/cart.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProductById } from '../../redux/product/product.api';
//import { selectCurrentProduct, selectLoading } from '../../redux/product/product.slice';
import { RootState } from '../../redux/store';
import LoadingPage from '../loading-page/LoadingPage';
import './ProductDetail.scss';

const ProductDetail = () => {
	const dispatch = useAppDispatch();
	const { productId:id, collection } = useParams();
	//const product = useAppSelector((state:RootState)=>selectCurrentProduct(state));
	const {currentProduct:product, isLoading} = useAppSelector((state:RootState)=>state.product);
	useEffect(()=>{
		dispatch(getProductById({id}))
	},[dispatch,id])
	if(isLoading)
		return <LoadingPage/>;

	if (product)
		return (
			<Container className="product-detail flex-column flex-md-row flex-xl-row flex-lg-row">
				<img
					className="product-img-detail"
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
		)
		else
		return <h1>Product not found.</h1>
	
	
};

export default ProductDetail;
