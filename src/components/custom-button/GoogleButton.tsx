import React from 'react';
import './GoogleButton.scss';
//import {signInWithGoogle} from '../../firebase/firebase.utils';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import initauth from '../../firebase/firebase.utils';
import googleLogo from '../../asserts/google.png';
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export default function GoogleButton() {
	//signInWithGoogle
	const handleGoogleSignIn = async () => {
		signInWithPopup(initauth, provider)
	};
	return (
		<button
			type="button"
			onClick={handleGoogleSignIn}
			className="google-btn"
		>
			<img className="google-btn--logo" src={googleLogo} />
			SIGN IN WITH GOOGLE
		</button>
	);
}
