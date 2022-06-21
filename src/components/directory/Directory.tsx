import { FC, useEffect } from 'react';
import MenuItem from '../menu-item/MenuItem';
import './Directory.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectCollection } from '../../redux/collection/collection.slice';
import {  getCollections } from '../../firebase/firebase.utils';


const Directory: FC = () => {
	const collectionList = useAppSelector((state) => selectCollection(state));
	return (
		<div className="directory-menu">
			{collectionList.map((item) => (
				<MenuItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default Directory;
