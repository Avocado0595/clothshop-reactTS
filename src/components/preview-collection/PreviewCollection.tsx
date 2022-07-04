import { FC, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import LoadingPage from '../../pages/loading-page/LoadingPage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProductBycollection } from '../../redux/product/product.api';
import { selectByCollection } from '../../redux/product/product.slice';
import PreviewItem from '../preview-item/PreviewItem';
import './PreviewCollection.scss';
const PreviewCollection: FC<{
	title: string;
	collectionId: string;
}> = ({ title, collectionId }) => {
	const dispatch = useAppDispatch();
	const {productList, isLoading} = useAppSelector((state) =>state.product);
	useEffect(()=>{
		dispatch(getProductBycollection({collectionId}))
	},[dispatch])
	if(isLoading)
		return <LoadingPage/>
	if(productList)
		return (
			<Container className="collection-preview">
				<h2 className="title">{title.toUpperCase()}</h2>
				<Row xs="2" md="3" lg="4" className="preview">
					{productList.map((item) => (
						<PreviewItem key={item.id} item={item} collection={title} />
					))}
				</Row>
			</Container>
		);
	else
		return <h1>Product list not found</h1>
};

export default PreviewCollection;

