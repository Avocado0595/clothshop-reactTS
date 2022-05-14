import React, { useState } from 'react';
import CustomButton from '../../../components/custom-button/CustomButton';
import IAccount from '../../../interfaces/IAccount';
import Input from './Input';
import './SignUp.scss';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
//const auth = getAuth();
import initauth, { createUser } from '../../../firebase/firebase.utils';
import './SignUp.scss';

export default function SignUp() {
	const [errMessage, setErrMessage] = useState<Record<string, string>>();
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			emailSignUp: { value: string };
			passwordSignUp: { value: string };
			confirmPassword: { value: string };
		};
		const displayName = target.name.value;
		const email = target.emailSignUp.value;
		const password = target.passwordSignUp.value;
		const confirmPassword = target.confirmPassword.value;
		try {
			await createUser({ email, password, displayName });
		} catch (e) {
			if ((e as Error).message.includes('user')) {
				setErrMessage({ email: 'Invalid user name.' });
			}
		}
	};

	return (
		<div className="sign-up">
			<h2>I don't have any account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<Input
					label="Display name"
					type="text"
					name="name"
					required={true}
				/>
				<Input
					label="Email"
					type="email"
					name="emailSignUp"
					required={true}
				/>
				<Input
					label="Password"
					type="password"
					name="passwordSignUp"
					required={true}
				/>
				<Input
					label="Confirm password"
					type="password"
					name="confirmPassword"
					required={true}
				/>
				<div className="btn-group">
					<CustomButton type="submit" content="sign up" />
				</div>
			</form>
		</div>
	);
}
