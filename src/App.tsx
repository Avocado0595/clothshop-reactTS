import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { selectUser, setCurrentUser } from './redux/user/user.slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { createUserProfile } from './firebase/firebase.utils';
import IUser from './interfaces/IUser';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shoppage/ShopPage';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import Category from './pages/collection/Collection';
import CartCheckout from './pages/cart-checkout/CartCheckout';
import './App.css';
import Search from './pages/search/Search';
import ProductDetail from './pages/product-detail/ProductDetail';

const App: FC = () => {
	const auth = getAuth();
	const currentUser = useAppSelector((state) => selectUser(state));
	const dispatch = useAppDispatch();
	useEffect(() => {
		const checkOut = onAuthStateChanged(auth, async (user) => {
			if (user) {
				await user.getIdToken();
				await createUserProfile(user as IUser);
				dispatch(setCurrentUser(user as IUser));
			}
		});
		return () => checkOut();
	}, []);
	return (
		<div className="App container-fluid">
			<Header />
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/contact" element={<h4>Contact here!</h4>} />
				<Route path="/:categoryName" element={<Category />} />
				<Route path="/checkout" element={<CartCheckout />} />
				<Route path="/search" element={<Search />} />
				<Route path="/product/:productId" element={<ProductDetail />} />
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

export default App;
