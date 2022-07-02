import { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { selectUser, setCurrentUser } from './redux/user/user.slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { createUserProfile, setPersistenceFirebase } from './firebase/firebase.utils';
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
import './App.css';


const App: FC = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const currentUser = useAppSelector((state) => selectUser(state));
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(getProductList());
		const checkOut = onAuthStateChanged(auth, async (user) => {
			setLoading(true);
			if (user) {
				const createdUser = {uid: user.uid,
					displayName: user.displayName|| '',
					email: user.email || '',
					photoURL: user.photoURL || ''};
				await createUserProfile(createdUser);
				dispatch(setCurrentUser(createdUser));
			}
			setLoading(false);
		});
		setPersistenceFirebase();
		return () => checkOut(); //componentWillUnMount()
	}, [dispatch]);
	
	return (!isLoading?(<div className="App container-fluid">
			<Header />
			<div className='container-fluid'>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/contact" element={<h4>Contact here!</h4>} />
				<Route path="/:collectionName" element={<Collection />} />
				<Route path="/checkout" element={<CartCheckout />} />
				<Route path="/search" element={<Search />} />
				<Route path="/product/:id" element={<ProductDetail />} />
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
			
		</div>):<LoadingPage/>
	);
};

export default App;
