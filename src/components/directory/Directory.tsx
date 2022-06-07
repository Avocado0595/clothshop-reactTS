import { FC, useEffect } from 'react';
import MenuItem from '../menu-item/MenuItem';
import './Directory.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectCollection } from '../../redux/collection/collection.slice';
import { addCollection, addProduct, getCollections } from '../../firebase/firebase.utils';
import { selectProduct } from '../../redux/product/product.slice';


const Directory: FC = () => {
	const collectionList = useAppSelector((state) => selectCollection(state));
	// const productList = useAppSelector(state=>selectProduct(state));
	useEffect(()=>{
		const a = async ()=> await getCollections();
	//	const b = async ()=> await addProduct(productList);
		a();
		//b();
	})
	return (
		<div className="directory-menu">
			{collectionList.map((item) => (
				<MenuItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default Directory;
