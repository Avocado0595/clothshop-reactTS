import { initializeApp } from 'firebase/app';

import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where, writeBatch } from 'firebase/firestore';

import {
	createUserWithEmailAndPassword,
	getAuth,
	setPersistence,
	browserSessionPersistence,
	signOut,
	updateProfile,
} from 'firebase/auth';
import IAccount from '../interfaces/IAccount';
import IUser from '../redux/user/user.interface';
import ICollection from '../interfaces/ICollection';
import IProduct from '../interfaces/IProduct';

const config = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
	authDomain: 'clothshop-b6cc2.firebaseapp.com',
	projectId: 'clothshop-b6cc2',
	storageBucket: 'clothshop-b6cc2.appspot.com',
	messagingSenderId: '644045758042',
	appId: '1:644045758042:web:5249b90958c8338bbc0263',
	measurementId: 'G-ZCFMX14DKK',
};
const app = initializeApp(config);
const initauth = getAuth(app);
const auth = getAuth();
export const db = getFirestore(app);

export const createUser = async (
	account: Omit<IAccount, 'displayName'> & { displayName?: string }
) => {
	const userCredential = await createUserWithEmailAndPassword(
		initauth,
		account.email,
		account.password
	);
	const user = userCredential.user;
	if (account.displayName)
		updateProfile(user, { displayName: account.displayName });
};


export const ggSignOut = async () => await signOut(auth);


export const createUserProfile = async (user: IUser) => {
	try {
		const userRef = doc(db,`users/${user.uid}`);
		const userSnapShot = await getDoc(userRef);
		if(!userSnapShot.exists())
		await setDoc(userRef, {
			displayName: user.displayName,
			email: user.email,
			createdAt: new Date()
		});
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const createUserCart = async(userUid: string, cartList: {id: number, name: string, price: number, quantity:number}[])=>{
	try{
		const userCartRef = doc(collection(db, `userCart`));
		await setDoc(userCartRef,{
			userUid: userUid,
			productList: [...cartList]
		});
	}
	catch(e){
		console.error('Error adding cart: ', e);
	}
}

export const getCollections = async ()=>{
	const q = query(collection(db, "collections"));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc:any) => {
		return doc.data() as ICollection
	});
}
export const getProducts = async ()=>{
	const q = query(collection(db, "products"));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc:any) => {
		return doc.data() as IProduct
	});
}

export const setPersistenceFirebase =()=>{ setPersistence(
	auth,
	browserSessionPersistence
)
	.then(() => {
		return null;
	})
	.catch((error) => {
		console.log(error);
	});
}

export default initauth;
