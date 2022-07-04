import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import PreviewItem from '../../components/preview-item/PreviewItem';
import { useAppSelector } from '../../redux/hooks';
import { selectSearchProduct } from '../../redux/product/product.slice';

const Search: FC = () => {
	const [searchParams] = useSearchParams();
	const productSearchList = useAppSelector((state) =>
		selectSearchProduct(state, searchParams.get('p') ?? '')
	);

	return (
		<Container className="collection-preview">
			<h4 className="title">
				Search result for: {searchParams.get('p')}
			</h4>
			<Row xs="2" md="3" lg="4" className="preview">
				{productSearchList.map((item) => (
					<PreviewItem  item={item} />
				))}
			</Row>
		</Container>
	);
};

export default Search;
