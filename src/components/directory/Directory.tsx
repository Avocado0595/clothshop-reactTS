import React, { useEffect, useState } from 'react';
import ICategory from '../../interfaces/ICategory';
import MenuItem from '../menu-item/MenuItem';
import './Directory.scss';
import SHOP_DATA from '../../database';

export default function Directory() {
	const [categoryList, setCategoryList] =
		useState<Array<ICategory>>(SHOP_DATA);
	return (
		<div className="directory-menu">
			{categoryList.map((item) => (
				<MenuItem key={item.id} item={item} />
			))}
		</div>
	);
}
