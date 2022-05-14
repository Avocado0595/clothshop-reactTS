import { FC, useEffect } from 'react';
import './App.css';
import Homepage from './pages/homepage/Homepage';
import {
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import ShopPage from './pages/shoppage/ShopPage';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';

import {
	getAuth,
	onAuthStateChanged,
	
} from 'firebase/auth';

import {  createUserProfile } from './firebase/firebase.utils';
import { Dispatch } from 'redux';
import { clearCurrentUser, setCurrentUser } from './redux/user/user.action';
import IUser from './interfaces/IUser';
import { connect } from 'react-redux';
import { IAction } from './redux/user/user.reducer';
import { IRootReducer } from './redux/rootReducer';
import CartCheckout from './pages/cart-checkout/CartCheckout';
import Category from './pages/category/Category';

const auth = getAuth();

const App: FC<{
	currentUser: IUser | null;
	setCurrentUser: (user: IUser) => IAction;
	clearCurrentUSer: () => IAction;
}> = ({ currentUser, setCurrentUser }) => {
	
	useEffect(() => {
		const check = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken();
			

				await createUserProfile(user);
				setCurrentUser(user as IUser);
				localStorage.setItem('myclothToken', token);
			} else {
				localStorage.removeItem('myclothToken');
			}
		});
		return () => check();
	}, []);
	return (

		<div className="App">
			<Header />
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/:categoryName" element={<Category />} />
				<Route path="/checkout" element={<CartCheckout />} />
				<Route
					path="/signin"
					element={
						currentUser ? (
							<Navigate to="/" replace />
						) : (
							<SignInAndSignUp />
						)
					}
				/>
			</Routes>
		</div>
	);
};

const mapStateToProps = (state: IRootReducer) => ({
	currentUser: state.user.currentUser,
});
const mapDispatchToProp = (dispatch: Dispatch) => ({
	setCurrentUser: (user: IUser) => dispatch(setCurrentUser(user as IUser)),
	clearCurrentUSer: () => dispatch(clearCurrentUser()),
});
export default connect(mapStateToProps, mapDispatchToProp)(App);
