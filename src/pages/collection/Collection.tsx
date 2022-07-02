import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import { getCollectionList } from '../../redux/collection/collection.api';
import { selectCollection } from '../../redux/collection/collection.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Collection = () => {
	const dispatch = useAppDispatch();
	const { collectionName } = useParams();
	const collectionList = useAppSelector((state) => selectCollection(state));
	useEffect(()=>{
		if(collectionList){
			dispatch(getCollectionList());
		}
	},[dispatch])
	const collection = collectionList.filter(
		(i) => i.title.toLowerCase() === collectionName
	)[0];
	if (collection)
		return (
			<PreviewCollection
				title={collection.title}
				collectionId={collection.id}
			/>
		);
	else return <h3>Not Found Collection!</h3>;
};

export default Collection;
