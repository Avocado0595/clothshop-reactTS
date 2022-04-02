import React, { useEffect, useState } from 'react'
import IProduct from '../../interfaces/IProduct';
import MenuItem from '../menu-item/MenuItem';
import './Directory.scss';
const sections:Array<IProduct> = [
    {
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      id: 1,
      linkUrl: 'shop/hats'
    },
    {
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
      id: 2,
      linkUrl: 'shop/jackets'
    },
    {
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      id: 3,
      linkUrl: 'shop/sneakers'
    },
    {
      title: 'womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens'
    },
    {
      title: 'mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    }
  ];
export default function Directory() {
    const [categoryList, setCategoryList] =useState<Array<IProduct>>(sections);
  return (
    <div className='directory-menu'>
      {categoryList.map(item => (
        
          <MenuItem key={item.id} item={item} />
        
      ))}
</div>
  )
}
