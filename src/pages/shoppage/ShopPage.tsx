import { FC, useEffect } from 'react';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import { getCollectionList } from '../../redux/collection/collection.api';

import { selectCollection } from '../../redux/collection/collection.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
const ShopPage: FC = () => {
	const dispatch = useAppDispatch();
	const collectionList = useAppSelector((state) => selectCollection(state));
	useEffect(()=>{
		if(!collectionList){
			dispatch(getCollectionList());
		}
	},[dispatch])
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
