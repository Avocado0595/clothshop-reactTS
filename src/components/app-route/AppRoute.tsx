import { Navigate, Route, Routes } from "react-router-dom";
import CartCheckout from "../../pages/cart-checkout/CartCheckout";
import Homepage from "../../pages/homepage/Homepage";
import ProductDetail from "../../pages/product-detail/ProductDetail";
import Search from "../../pages/search/Search";
import ShopPage from "../../pages/shoppage/ShopPage";
import SignInAndSignUp from "../../pages/sign-in-and-sign-up/SignInAndSignUp";
import { useAppSelector } from "../../redux/hooks";
import Collection from "../collection/Collection";
import { selectUser } from "../../redux/user/user.slice";
export default function AppRoute(){
    const currentUser = useAppSelector((state) => selectUser(state));
    return(
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product" element={<ShopPage />} />
                <Route path="/contact" element={<h4>Contact here!</h4>} />
                <Route path="/:collection" element={<Collection />} />
                <Route path="/checkout" element={<CartCheckout />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:collection/:productId" element={<ProductDetail />}/>
                <Route
                    path="/signin"
                    element={currentUser ? (<Navigate to="/" replace />) : (<SignInAndSignUp />)}
                />
            </Routes>);
}