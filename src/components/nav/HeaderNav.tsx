import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ggSignOut } from '../../firebase/firebase.utils';
import userDefaultAva from '../../asserts/user.svg';
import './HeaderNav.scss';
import { getAuth } from 'firebase/auth';
const HeaderNav = (props: { setShow: (p: boolean) => void }) => {
	const currentUser = getAuth().currentUser;
	const handleSignOut = async () => {
		await ggSignOut();
		props.setShow(false);
	};

	return (
		<Nav>
			<Link
				onClick={() => props.setShow(false)}
				className="header-item"
				to="shop"
			>
				SHOP
			</Link>
			<Link
				onClick={() => props.setShow(false)}
				className="header-item"
				to="contact"
			>
				CONTACT
			</Link>

			{!currentUser ? (
				<Link
					onClick={() => props.setShow(false)}
					className="header-item"
					to="/signin"
				>
					SIGN IN
				</Link>
			) : (
				<NavDropdown
					title={
						<img
							alt="avatar"
							className="avatar-icon"
							src={currentUser.photoURL || userDefaultAva}
						/>
					}
					id="basic-nav-dropdown"
				>
					<NavDropdown.Item onClick={handleSignOut}>
						Log out
					</NavDropdown.Item>
				</NavDropdown>
			)}
		</Nav>
	);
};

export default HeaderNav;
