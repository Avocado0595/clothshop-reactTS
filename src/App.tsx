import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from './redux/hooks';
import {
	createUserProfile,
	setPersistenceFirebase,
} from './firebase/firebase.utils';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shoppage/ShopPage';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import Collection from './pages/collection/Collection';
import CartCheckout from './pages/cart-checkout/CartCheckout';
import Search from './pages/search/Search';
import ProductDetail from './pages/product-detail/ProductDetail';
import LoadingPage from './pages/loading-page/LoadingPage';
import { getProductList } from './redux/product/product.api';
import './App.scss';
import BreadcrumbCustom from './components/breadcrumb/BreadcrumbCustom';
import { Container } from 'react-bootstrap';

import Contact from './pages/contact/Contact';
function AppRoute() {
	const currentUser = getAuth().currentUser;
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/shop" element={<ShopPage />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/:collection" element={<Collection />} />
			<Route path="/checkout" element={<CartCheckout />} />
			<Route path="/search" element={<Search />} />
			<Route path="/:collection/:productId" element={<ProductDetail />} />
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
	);
}
const App = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(getProductList());
		const checkOut = onAuthStateChanged(auth, async (user) => {
			setLoading(true);
			if (user) {
				const createdUser = {
					uid: user.uid,
					displayName: user.displayName || '',
					email: user.email || '',
					photoURL: user.photoURL || '',
				};
				await createUserProfile(createdUser);
			}
			setLoading(false);
		});
		setPersistenceFirebase();
		return () => {
			return checkOut();
		};
	}, []);
	if (isLoading) return <LoadingPage />;
	return (
		<div className="App container-fluid">
			<Header />
			<Container>
				<BreadcrumbCustom />
				<AppRoute />
			</Container>
		</div>
	);
};

export default App;
