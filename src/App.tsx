import { FC, useContext, useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/homepage/Homepage';
import {
	Link,
	Navigate,
	PathMatch,
	Route,
	RouteMatch,
	Routes,
	useLocation,
	useMatch,
	useNavigate,
	useParams,
	useRoutes,
	useSearchParams,
} from 'react-router-dom';
import ShopPage from './pages/shoppage/ShopPage';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import firebase from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	setPersistence,
	browserSessionPersistence,
} from 'firebase/auth';
import UserContext from './context/userContext';
import IAccount from './interfaces/IAccount';
import { addDoc, collection } from 'firebase/firestore';
import { db, createUserProfile } from './firebase/firebase.utils';
import { Dispatch } from 'redux';
import { clearCurrentUser, setCurrentUser } from './redux/user/user.action';
import IUser from './interfaces/IUser';
import { connect } from 'react-redux';
import { IAction } from './redux/user/user.reducer';
import { IRootReducer } from './redux/rootReducer';
import CartCheckout from './pages/cart-checkout/CartCheckout';

const auth = getAuth();


const App: FC<{ currentUser:IUser|null, setCurrentUser: (user: IUser) => IAction,clearCurrentUSer: () => IAction }> = ({
	currentUser, setCurrentUser,clearCurrentUSer
}) => {
	setPersistence(auth, browserSessionPersistence)
		.then(() => {
			return null;
		})
		.catch((error) => {console.log(error)});
	//const [currentUser, setCurrentUser] = useState<Omit<IAccount,'password'>|null>(null);
	//const {currentUser} = useContext(UserContext);
	useEffect(() => {
		const check = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken();
				//setCurrentUser(user as Omit<IAccount,'password'>);

				await createUserProfile(user);
				setCurrentUser(user as IUser);
				localStorage.setItem('myclothToken', token);
			} else {
				// User is signed out
				// ...
				localStorage.removeItem('myclothToken');
			}
		});
		return () => check();
	},[]);
	return (
		// <UserContext.Provider value={currentUser}>

		<div className="App">
			<Header />
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/checkout" element={<CartCheckout />} />
				<Route path="/signin" element={currentUser?<Navigate to="/" replace />:<SignInAndSignUp />}/>
			</Routes>
		</div>
	);
};

const mapStateToProps = (state: IRootReducer)=>({
	currentUser: state.user.currentUser
})
const mapDispatchToProp = (dispatch: Dispatch) => ({
	setCurrentUser: (user: IUser) => dispatch(setCurrentUser(user as IUser)),
	clearCurrentUSer: () => dispatch(clearCurrentUser())
});
export default connect(mapStateToProps, mapDispatchToProp)(App);
