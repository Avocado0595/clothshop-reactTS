import React from 'react';
import './GoogleButton.scss';
//import {signInWithGoogle} from '../../firebase/firebase.utils';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import initauth from '../../firebase/firebase.utils';
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export default function GoogleButton() {
	//signInWithGoogle
	const handleGoogleSignIn = () => {
		signInWithPopup(initauth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential =
					GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				localStorage.setItem('myclothToken', token || '');
				// // The signed-in user info.
				//const user = result.user;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential =
					GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	return (
		<button
			type="button"
			onClick={handleGoogleSignIn}
			className="google-btn"
		>
			SIGN IN WITH GOOGLE
		</button>
	);
}
