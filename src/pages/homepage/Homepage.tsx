import { lazy, Suspense, useEffect } from 'react';
import { getCollectionList } from '../../redux/collection/collection.api';
import { useAppDispatch } from '../../redux/hooks';
import LoadingPage from '../loading-page/LoadingPage';
import './Homepage.scss';
const Collection = lazy(()=>import('../../components/collection/Collection'))
export default function Homepage() {
	const dispatch = useAppDispatch();
	useEffect(()=>{
		dispatch(getCollectionList());
	},[dispatch])
	return (
		<Suspense fallback={<LoadingPage/>}>
		<div className="homepage">
			<Collection />
		</div>
		</Suspense>
	);
}
