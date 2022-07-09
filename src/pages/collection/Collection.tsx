import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import IProduct from '../../interfaces/IProduct';
import { getCollectionByTitle } from '../../redux/collection/collection.api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectProductByCollection } from '../../redux/product/product.slice';
import { RootState } from '../../redux/store';
import LoadingPage from '../loading-page/LoadingPage';

const Collection = () => {
	const dispatch = useAppDispatch();
	const { collection: title } = useParams();
	const { isLoading, currentCollection } = useAppSelector(
		(state) => state.collection
	);
	const productListByCollection = useAppSelector((state: RootState) =>
		selectProductByCollection(state)
	);
	useEffect(() => {
		if (!currentCollection || currentCollection.title !== title) {
			dispatch(getCollectionByTitle({ title }));
		}
	}, [dispatch, currentCollection]);
	if (isLoading || currentCollection?.title !== title) return <LoadingPage />;

	if (currentCollection)
		return (
			<PreviewCollection
				title={currentCollection.title}
				collectionId={currentCollection.routeName}
				productList={productListByCollection as IProduct[]}
			/>
		);
	else return <h3>Not Found Collection!</h3>;
};

export default Collection;
