import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../asserts/crown.svg';
import { ggSignOut } from '../../firebase/firebase.utils';
import { getAuth } from 'firebase/auth';
import { FC, useContext, useEffect, useState } from 'react';
import IAccount from '../../interfaces/IAccount';
import UserContext from '../../context/userContext';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import { IRootReducer } from '../../redux/rootReducer';
import IUser from '../../interfaces/IUser';
import { clearCurrentUser, setCurrentUser } from '../../redux/user/user.action';
import { Dispatch } from 'redux';
import { IAction } from '../../redux/user/user.reducer';

const Header: FC<{ currentUser: IUser | null, clearCurrentUser: () => IAction }> = ({ currentUser, clearCurrentUser }) => {
	const handleSignOut = async()=>{
		await ggSignOut();
		clearCurrentUser();
	}
	return (
		<div className="header">
			<Link to="/" className="header-link">
				<ReactSVG src={Logo} />
			</Link>
			<div className="header-menu">
				<Link className="header-item" to="/shop">
					SHOP
				</Link>
				<Link className="header-item" to="/contact">
					CONTACT
				</Link>
				{!currentUser ? (
					<Link className="header-item" to="/signin">
						SIGN IN
					</Link>
				) : (
					<a className="header-item" onClick={handleSignOut}>
						SIGN OUT
					</a>
				)}
				<Link className="header-item" to="/contact">
					CART
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IRootReducer) => ({
	currentUser: state.user.currentUser,
});
const mapDispatchToProp = (dispatch: Dispatch) =>({
	clearCurrentUser: ()=>dispatch(clearCurrentUser())
})
export default connect(mapStateToProps, mapDispatchToProp)(Header);
