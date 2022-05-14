import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import ICategory from '../../interfaces/ICategory';
import { selectDirectorySection } from '../../redux/directory/directory.selector';

const Category:FC<{categoryList: ICategory[]}> = ({categoryList})=> {
	const {categoryName} = useParams();
	const category = categoryList.filter(i=>i.title.toLowerCase() === categoryName)[0];
	return <PreviewCollection title={category.title} itemList={category.items}/>
}
const mapStateToProps = createStructuredSelector({
	categoryList: selectDirectorySection,
});
export default connect(mapStateToProps)(Category);

