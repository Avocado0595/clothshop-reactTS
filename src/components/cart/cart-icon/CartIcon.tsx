import React, { FC } from 'react'
import './CartIcon.scss';
import cartIcon from '../../../asserts/shopping-cart.png';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleCart } from '../../../redux/cart/cart.action';
import { ICartAction } from '../../../redux/cart/cart.interface';
import { IRootReducer } from '../../../redux/rootReducer';
import { selectCartItemCount } from '../../../redux/cart/cart.selector';
const CartIcon:FC<{toggleCart:()=>ICartAction, numberOfItem: number}> = ({toggleCart,numberOfItem})=> {
  return (
    <a onClick={toggleCart} className='header-item cart'>
						<div className='cart-count'>{numberOfItem}</div>
						<img alt='cart' className='cart-icon' src={cartIcon}/>
					</a>
  )
}
const mapDispatchToProp = (dispatch:Dispatch)=>({
  toggleCart: ()=>dispatch(toggleCart())
})
const mapStateToProps = (state: IRootReducer)=>({
  numberOfItem: selectCartItemCount(state)
})
export default connect(mapStateToProps,mapDispatchToProp)(CartIcon);
