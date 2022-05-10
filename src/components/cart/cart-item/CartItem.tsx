import React, { FC } from 'react'
import IProduct from '../../../interfaces/IProduct'
import { ICartItem } from '../../../redux/cart/cart.interface';
import './CartItem.scss';
const CartItem:FC<{item: ICartItem}> = ({item})=> {
  return (
    <div className='cart-item-layout' key={item.id}>
			<img alt='item image' className='cart-item-img' src={item.imageUrl}></img>
            <div className='cart-item-info'>
                <p className='cart-item-name'>{item.name}</p>
                <p className='cart-item-price'>{item.quantity} &times; {item.price}$</p></div>
            </div>
  )
}

export default CartItem