import React, { useState } from 'react'
import PreviewCollection from '../../components/preview-collection/PreviewCollection';
import SHOP_DATA from '../../database';
import ICategory from '../../interfaces/ICategory';
export default function ShopPage() {
    const [collection, setCollection] = useState<Array<ICategory>>(SHOP_DATA);
  return (
    <div>SHOP_PAGE
      {
collection.map(item=>
  <PreviewCollection key={item.id} title={item.title} itemList={item.items}/>
  )
      }
    </div>
  )
}
