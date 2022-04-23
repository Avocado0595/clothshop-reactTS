import { useContext, useEffect, useState } from 'react'
import './App.css'
import Homepage from './pages/homepage/Homepage'
import {
  Link,
  PathMatch,
  Route, RouteMatch, Routes, useLocation, useMatch, useNavigate, useParams, useRoutes, useSearchParams
} from "react-router-dom";
import ShopPage from './pages/shoppage/ShopPage';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import firebase from 'firebase/app';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence  } from 'firebase/auth';
import UserContext from './context/userContext';
import IAccount from './interfaces/IAccount';
import { addDoc, collection } from 'firebase/firestore';
import { db, createUserProfile } from './firebase/firebase.utils';
const auth = getAuth();

function App() {
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return null;
  })
  .catch((error) => {
  });
  const [currentUser, setCurrentUser] = useState<Omit<IAccount,'password'>|null>(null);
  //const {currentUser} = useContext(UserContext);
  useEffect(()=>{
   
    const check = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setCurrentUser(user as Omit<IAccount,'password'>);
          await createUserProfile(user);
          localStorage.setItem('myclothToken',token );
        } else {
          // User is signed out
          // ...
          localStorage.removeItem('myclothToken');
        }
      });
    return ()=>check();
  })
  return (
    <UserContext.Provider value={currentUser}>
<div className="App">
      <Header/>
      <Routes>
        <Route index element={<Homepage />}/>
        <Route path="/shop" element={<ShopPage />}/>
        <Route path="/signin" element={<SignInAndSignUp />}/>
      </Routes>
    </div>
    </UserContext.Provider>
      
   
  )
}

export default App
