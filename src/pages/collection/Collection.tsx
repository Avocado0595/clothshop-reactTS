import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import { getCollectionByTitle } from '../../redux/collection/collection.api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import LoadingPage from '../loading-page/LoadingPage';

const Collection = () => {
	const dispatch = useAppDispatch();
	const { collection:title } = useParams();
	const {isLoading, currentCollection} = useAppSelector((state) => state.collection);
	useEffect(()=>{
		if(!currentCollection || currentCollection.title !== title){
			dispatch(getCollectionByTitle({title}));
		}
	},[dispatch])
	if(isLoading)
		return <LoadingPage/>

	if (currentCollection)
		return (
			<PreviewCollection
				title={currentCollection.title}
				collectionId={currentCollection.routeName}
			/>
		);
	else return <h3>Not Found Collection!</h3>;
};

export default Collection;
