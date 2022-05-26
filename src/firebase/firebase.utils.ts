import { initializeApp } from 'firebase/app';

import { doc, getFirestore, setDoc } from 'firebase/firestore';

import {
	createUserWithEmailAndPassword,
	getAuth,
	setPersistence,
	browserSessionPersistence,
	signOut,
	updateProfile,
} from 'firebase/auth';
import IAccount from '../interfaces/IAccount';
import IUser from '../interfaces/IUser';

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
		const docRef = doc(db, 'users', `${user.uid}`);
		await setDoc(docRef, {
			displayName: user.displayName,
			email: user.email,
		});
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};
export const setPersistenceFirebase = setPersistence(
	auth,
	browserSessionPersistence
)
	.then(() => {
		return null;
	})
	.catch((error) => {
		console.log(error);
	});
export const db = getFirestore(app);

export default initauth;
