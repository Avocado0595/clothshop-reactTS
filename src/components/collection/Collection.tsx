import { FC, useEffect } from 'react';
import MenuItem from '../menu-item/MenuItem';
import './Collection.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCollection } from '../../redux/collection/collection.slice';
import { getCollectionList } from '../../redux/collection/collection.api';
import { Row } from 'react-bootstrap';


const Collection = () => {
	const collectionList = useAppSelector((state) => selectCollection(state));
	return (
		<Row className="directory-menu row-cols-3 justify-content-center">
			{collectionList.map((item,idx) => (
				<MenuItem key={idx} item={item} />
			))}
		</Row>
	);
};

export default Collection;
