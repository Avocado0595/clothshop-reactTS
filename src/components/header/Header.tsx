
import './Header.scss';
import {Link} from 'react-router-dom';
import Logo from '../../asserts/crown.svg';
import {ggSignOut } from '../../firebase/firebase.utils';
import { getAuth } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import IAccount from '../../interfaces/IAccount';
import UserContext from '../../context/userContext';
import { ReactSVG } from 'react-svg'
export default function Header() {
  const currentUser =useContext(UserContext);
  // useEffect(()=>{
  //   const auth = getAuth();
  // })
  //const handleSignIn = (){}
  return (
    <div className="header">
        <Link to="/" className='header-link'>
          <ReactSVG src={Logo}/>
        </Link>
        <div className='header-menu'>
            <Link className='header-item' to="/shop">SHOP</Link>
            <Link className='header-item' to="/contact">CONTACT</Link>
            {!currentUser?<Link className='header-item' to="/signin">SIGN IN</Link>:
            <a className='header-item' onClick={ggSignOut} >SIGN OUT</a>}
            <Link className='header-item' to="/contact">CART</Link>
        </div>
    </div>
  )
}
