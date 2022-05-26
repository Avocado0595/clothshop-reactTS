import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../asserts/crown.svg';
import { ggSignOut } from '../../firebase/firebase.utils';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import { clearCurrentUser, selectUser } from '../../redux/user/user.slice';

import CartdDropdown from '../cart/cart-dropdown/CartdDropdown';
import CartIcon from '../cart/cart-icon/CartIcon';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCartToggle } from '../../redux/cart/cart.slice';
import { Navbar } from 'reactstrap';

import userAva from '../../asserts/user.png';
import SearchInput from '../search-input/SearchInput';
const Header: FC = () => {
	const currentUser = useAppSelector((state) => selectUser(state));
	const toggleCart = useAppSelector((state) => selectCartToggle(state));
	const dispatch = useAppDispatch();
	const handleSignOut = async () => {
		await ggSignOut();
		dispatch(clearCurrentUser());
	};
	return (
		<header className="header">
			<Navbar fixed="top">
				<Link to="/" className="header-link">
					<ReactSVG className="header-logo" src={Logo} />
					<h1>MY CLOTH SHOP</h1>
				</Link>

				<div className="header-menu">
					<Link className="header-item " to="/shop">
						SHOP
					</Link>
					<Link className="header-item" to="/contact">
						CONTACT
					</Link>
					<SearchInput />

					{!currentUser ? (
						<Link className="header-item" to="/signin">
							<a className="header-item">SIGN IN</a>
						</Link>
					) : (
						<a className="header-item" onClick={handleSignOut}>
							<img
								className="avatar-icon"
								src={currentUser.photoURL || userAva}
							/>
							SIGN OUT
						</a>
					)}
					<CartIcon />
				</div>
				{toggleCart ? null : <CartdDropdown />}
			</Navbar>
		</header>
	);
};

export default Header;
