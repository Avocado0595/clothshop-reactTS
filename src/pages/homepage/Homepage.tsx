import { lazy, Suspense, useEffect } from 'react';
import { getCollectionList } from '../../redux/collection/collection.api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import LoadingPage from '../loading-page/LoadingPage';
import './Homepage.scss';
const Collection = lazy(()=>import('../../components/collection/Collection'))
export default function Homepage() {
	const dispatch = useAppDispatch();
	const collectionList = useAppSelector((state:RootState)=>state.collection.collectionList)
	if(!collectionList.length)
		dispatch(getCollectionList());
	return (
		<Suspense fallback={<LoadingPage/>}>
		<div className="homepage">
			<Collection />
		</div>
		</Suspense>
	);
}
