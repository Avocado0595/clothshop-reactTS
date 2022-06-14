import { FC } from 'react';
import { useParams } from 'react-router-dom';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import { selectCollection } from '../../redux/collection/collection.slice';
import { useAppSelector } from '../../redux/hooks';

const Category: FC = () => {
	const { categoryName } = useParams();
	const collectionList = useAppSelector((state) => selectCollection(state));
	const collection = collectionList.filter(
		(i) => i.title.toLowerCase() === categoryName
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

export default Category;
