import { FC } from 'react';
import ICollection from '../../interfaces/ICollection';
import MenuItem from '../menu-item/MenuItem';
import './Directory.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySection } from '../../redux/directory/directory.selector';

const Directory: FC<{ categoryList: Array<ICollection> }> = ({
	categoryList,
}) => {
	return (
		<div className="directory-menu">
			{categoryList.map((item) => (
				<MenuItem key={item.id} item={item} />
			))}
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	categoryList: selectDirectorySection,
});
export default connect(mapStateToProps)(Directory);
