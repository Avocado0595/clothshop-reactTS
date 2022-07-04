import { Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ggSignOut } from "../../firebase/firebase.utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCurrentUser, selectUser } from "../../redux/user/user.slice";
import userDefaultAva from '../../asserts/user.png'
const HeaderNav = (props:{setShow:(p:boolean)=>void})=>{
    const currentUser = useAppSelector((state) => selectUser(state));
    const dispatch = useAppDispatch();
    const handleSignOut = async () => {
		await ggSignOut();
		dispatch(clearCurrentUser());
	};

    return (<Nav onClick={()=>props.setShow(false)}>
    <Link className="header-item" to="shop">
        SHOP
    </Link>
    <Link className="header-item" to="contact">
        CONTACT
    </Link>

    {!currentUser ? (
        <Link className="header-item" to="/signin">
            SIGN IN
        </Link>
    ) : (
        <NavDropdown
            title={
                <img
                alt="avatar"
                    className="avatar-icon"
                    src={
                        currentUser.photoURL ||
                        userDefaultAva
                    }
                />
            }
            id="basic-nav-dropdown"
        >
            <NavDropdown.Item
                onClick={handleSignOut}
            >
                Log out
            </NavDropdown.Item>
        </NavDropdown>
    )}

</Nav>)
}

export default HeaderNav;