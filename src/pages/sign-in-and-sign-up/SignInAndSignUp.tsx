import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './SignInAndSignUp.scss';
export default function SignInAndSignUp() {
	return (
		<div className="signin-and-signup">
			<SignIn />
			<SignUp />
		</div>
	);
}
