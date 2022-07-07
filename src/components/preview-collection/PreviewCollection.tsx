import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import IProduct from '../../interfaces/IProduct';
import { useAppDispatch } from '../../redux/hooks';
import { getProductBycollection } from '../../redux/product/product.api';
import PreviewItem from '../preview-item/PreviewItem';
import './PreviewCollection.scss';
const PreviewCollection = (props: {
	title: string;
	collectionId: string;
	productList: IProduct[];
}) => {
	const { title, collectionId, productList } = props;
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getProductBycollection({ collectionId }));
	}, [dispatch]);

	if (productList)
		return (
			<Container key={collectionId} className="collection-preview">
				<h2 className="title">
					{title[0].toUpperCase() + title.slice(1)} collection
				</h2>
				<Row xs="2" md="3" lg="4" className="preview">
					{productList.map((item) => (
						<PreviewItem key={item.id} item={item} />
					))}
				</Row>
			</Container>
		);
	return <h1>Product list not found</h1>;
};

export default PreviewCollection;
