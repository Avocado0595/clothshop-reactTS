import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import { getCollectionList } from '../../redux/collection/collection.api';

import { selectCollection } from '../../redux/collection/collection.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectProductList } from '../../redux/product/product.slice';
import { RootState } from '../../redux/store';
const ShopPage = () => {
	const dispatch = useAppDispatch();
	const collectionList = useAppSelector((state: RootState) =>
		selectCollection(state)
	);
	const productList = useAppSelector((state: RootState) =>
		selectProductList(state)
	);
	if (!collectionList || collectionList.length === 0) {
		dispatch(getCollectionList());
	}
	return (
		<div>
			<h3>Explore your style here</h3>
			{collectionList.map((item) => {
				const productListByCollection = productList.filter(
					(i) => i.collectionId == item.id
				);
				return (
					<PreviewCollection
						key={item.id}
						title={item.title}
						collectionId={item.id}
						productList={productListByCollection.filter(
							(_, i) => i < 4
						)}
					/>
				);
			})}
		</div>
	);
};

export default ShopPage;
