import { FC } from 'react';
import { Container, Row } from 'reactstrap';
import { useAppSelector } from '../../redux/hooks';
import { selectByCollection } from '../../redux/product/product.slice';
import PreviewItem from '../preview-item/PreviewItem';
import './PreviewCollection.scss';
const PreviewCollection: FC<{
	title: string;
	collectionId: number;
}> = ({ title, collectionId }) => {
	const productList = useAppSelector((state) =>selectByCollection(state, collectionId));
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
