import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import CustomButton from '../../../components/custom-button/CustomButton';
import GoogleButton from '../../../components/custom-button/GoogleButton';
import IAccount from '../../../interfaces/IAccount';
import Input from './Input';
import './SignIn.scss';
import initauth from '../../../firebase/firebase.utils';

export default function SignIn() {
	const [account, setAccount] = useState<Omit<IAccount, 'displayName'>>({
		email: '',
		password: '',
	});

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value; // typechecks!
		const password = target.password.value; // typechecks!
		//console.log({email, password});
		//setAccount({email, password});
		signInWithEmailAndPassword(initauth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<Input
					label="Email"
					type="email"
					name="email"
					required={true}
				/>
				<Input
					label="Password"
					type="password"
					name="password"
					required={true}
				/>
				<div className="btn-group">
					<CustomButton type="submit" content="sign in" />
					<GoogleButton />
				</div>
			</form>
		</div>
	);
}
