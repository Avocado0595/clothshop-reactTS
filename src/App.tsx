import { FC, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { selectUser, setCurrentUser } from './redux/user/user.slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { createUserProfile, getCollections, setPersistenceFirebase } from './firebase/firebase.utils';
import Header from './components/header/Header';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shoppage/ShopPage';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import Category from './pages/collection/Collection';
import CartCheckout from './pages/cart-checkout/CartCheckout';
import './App.css';
import Search from './pages/search/Search';
import ProductDetail from './pages/product-detail/ProductDetail';
import { getCollectionFromApi } from './redux/collection/collection.slice';
import LoadingPage from './pages/loading-page/LoadingPage';
import { addProductAsync } from './redux/product/product.saga';
const App: FC = () => {
	const auth = getAuth();
	const currentUser = useAppSelector((state) => selectUser(state));
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		dispatch(addProductAsync());
		const data = async ()=> {
			setIsLoading(true);
			setPersistenceFirebase();
			const collections = await getCollections();
			dispatch(getCollectionFromApi(collections));
			setIsLoading(false);
		}
		const checkOut = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const createdUser = {uid: user.uid,
					displayName: user.displayName|| '',
					email: user.email || '',
					photoURL: user.photoURL || ''};
				await createUserProfile(createdUser);
				dispatch(setCurrentUser(createdUser));
			}
		});
		data();
		return () => checkOut(); //componentWillUnMount()
	}, []);
	if(isLoading)
		return (<LoadingPage/>)
	else
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
