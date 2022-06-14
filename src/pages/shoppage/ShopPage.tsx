import { FC } from 'react';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';

import { selectCollection } from '../../redux/collection/collection.slice';
import { useAppSelector } from '../../redux/hooks';
const ShopPage: FC = () => {
	const collectionList = useAppSelector((state) => selectCollection(state));
	return (
		<div>
			<h3>COLLECTIONS</h3>
			{collectionList.map((item) => (
				<PreviewCollection
					key={item.id}
					title={item.title}
					collectionId={item.id}
				/>
			))}
		</div>
	);
};

export default ShopPage;
