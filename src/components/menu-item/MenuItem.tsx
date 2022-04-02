import React from 'react'
import IProduct from '../../interfaces/IProduct'
import './MenuItem.scss';
export default function MenuItem(props: { item: IProduct }) {
    const { item } = props;
    return (
        <div className='menu-item' >
            <div className='background-item' style={{backgroundImage:`url(${item.imageUrl})`}}></div>
            <div className='content'>
                <h1 className='title'>{item.title.toUpperCase()}</h1>
                <span className='subtitle'>SHOP NOW</span>
            </div>
        </div>
    )
}
