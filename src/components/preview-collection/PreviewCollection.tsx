import { useEffect } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
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
		dispatch(getProductBycollection({ collectionId: collectionId, order:undefined }));
	}, [dispatch]);
	const handleSortChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
		if(e.target.value == 'desc' || e.target.value == 'asc'){
			dispatch(getProductBycollection({ collectionId: collectionId, order:e.target.value }))
		}
	}
	if (productList)
		return (
			<Container  key={collectionId} className="collection-preview">
				<div className="pe-4 align-items-start justify-content-between d-flex direction-row">
				<h2 className="title">
					{title[0].toUpperCase() + title.slice(1)} collection
				</h2>
				<Form.Select onChange={handleSortChange} className='select-form' aria-label="Default select example">
					<option value="">Sort</option>
					<option value="asc">Price: ascending</option>
					<option value="desc">Price: descending</option>
				</Form.Select>
				</div>
				
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
