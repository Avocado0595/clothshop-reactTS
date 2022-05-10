import { FC } from 'react'
import { connect } from 'react-redux'
import { ReactSVG } from 'react-svg'
import { Dispatch } from 'redux'
import CountButton from '../../components/custom-button/IconButton/CountButton'
import IProduct from '../../interfaces/IProduct'
import { addItem, reduceItem, deleteItem } from '../../redux/cart/cart.action'
import { ICartAction, ICartItem } from '../../redux/cart/cart.interface'
import { selectTotalPrice } from '../../redux/cart/cart.selector'
import { IRootReducer } from '../../redux/rootReducer'
import leftIcon from '../../asserts/caret-left.svg'
import rightIcon from '../../asserts/caret-right.svg'
import trashIcon from '../../asserts/trash.svg'
import './CartCheckout.scss';
const CartCheckout:FC<{cartList: Array<ICartItem>, cartTotalPrice: number, addItem:(item:IProduct)=>ICartAction,
  reduceItem:(item:IProduct)=>ICartAction,
  deleteItem:(item:IProduct)=>ICartAction}> = ({cartList,cartTotalPrice, addItem, reduceItem, deleteItem})=> {

  return (
    <div>
        <h3>Checkout</h3>
        <table>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
          {cartList.map(item=>(<tr>
            <td><img alt='product image' className='product-img' src={item.imageUrl}/></td>
            <td>{item.name}</td>
            <td><div className='count-column'><ReactSVG className='icon-arrow left' onClick={()=>addItem(item)} src={leftIcon}/>{item.quantity}<ReactSVG 
            onClick={()=>reduceItem(item)} src={rightIcon} className='icon-arrow right'/></div></td>
            <td>{item.price*item.quantity}$</td>
            <td><ReactSVG className='icon-trash' src={trashIcon} onClick={()=>deleteItem(item)}/></td>
          </tr>))}
      </table>
        <h3>TOTAL: {cartTotalPrice}$</h3>
    </div>
  )
}

const mapStateToProps = (state:IRootReducer)=>({
    cartList: state.cart.itemList,
    cartTotalPrice: selectTotalPrice(state)
})
const mapDispatchToProp = (dispatch:Dispatch)=>(
  {
    addItem: (item:IProduct)=>dispatch(addItem(item)),
    reduceItem: (item:IProduct)=>dispatch(reduceItem(item)),
    deleteItem: (item:IProduct)=>dispatch(deleteItem(item))
  }
)
export default connect(mapStateToProps, mapDispatchToProp)(CartCheckout)