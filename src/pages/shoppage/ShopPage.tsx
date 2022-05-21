import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PreviewCollection from '../../components/preview-collection/PreviewCollection';

import ICollection from '../../interfaces/ICollection';
import { selectDirectorySection } from '../../redux/directory/directory.selector';
const ShopPage: FC<{ collection: Array<ICollection> }> = ({ collection }) => {
	return (
		<div>
			SHOP_PAGE
			{collection.map((item) => (
				<PreviewCollection
					key={item.id}
					title={item.title}
					itemList={item.items}
				/>
			))}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	collection: selectDirectorySection,
});
export default connect(mapStateToProps)(ShopPage);
