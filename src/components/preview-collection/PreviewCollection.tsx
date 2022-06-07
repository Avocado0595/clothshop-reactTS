import { FC, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { fetchProduct } from '../../fetch-data/product.fetch';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PreviewItem from '../preview-item/PreviewItem';
import './PreviewCollection.scss';
const PreviewCollection: FC<{
	title: string;
	collectionId: number;
}> = ({ title, collectionId }) => {
	
	const productList = useAppSelector((state) =>
		state.product.productList.filter((p) => p.collectionId === collectionId)
	);
	
	return (
		<Container className="collection-preview">
			<h2 className="title">{title.toUpperCase()}</h2>
			<Row xs="2" md="3" lg="4" className="preview">
				{productList.map((item) => (
					<PreviewItem key={item.id} item={item} />
				))}
			</Row>
		</Container>
	);
};

export default PreviewCollection;
