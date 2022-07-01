
import './CollectionList.scss';
import MenuItem from '../menu-item/MenuItem';
import { useAppSelector } from '../../redux/hooks';
import { selectCollection } from '../../redux/collection/collection.slice';


const CollectionList = () => {
	const collectionList = useAppSelector((state) => selectCollection(state));
	return (
		<div className="collection-list">
			{collectionList.map((item) => (
				<MenuItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default CollectionList;
