import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import CustomButton from '../../../components/custom-button/CustomButton';
import GoogleButton from '../../../components/custom-button/GoogleButton';
import Input from './Input';
import './SignIn.scss';
import initauth from '../../../firebase/firebase.utils';
import Loading from '../../../components/loading-icon/Loading';
import { Col } from 'reactstrap';

export default function SignIn() {
	const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<Record<string, string>>();

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setIsLoadingState(true);
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value; // typechecks!
		const password = target.password.value; // typechecks!
		try {
			await signInWithEmailAndPassword(initauth, email, password);
		} catch (e) {
			if ((e as Error).message.includes('user')) {
				setErrMessage({ email: 'Invalid user name.' });
			}
			if ((e as Error).message.includes('password')) {
				setErrMessage({ password: 'Wrong password.' });
			}
		}
		setIsLoadingState(false);
	};

	return (
		<Col className="sign-in">
			{isLoadingState ? (
				<div className="loading-modal">
					<Loading />
				</div>
			) : null}
			<h2>If you already had an account</h2>
			<span>Sign in with your email and password here.</span>
			<form
				onSubmit={handleSubmit}
				onChange={() => setErrMessage(undefined)}
			>
				<Input
					label="Email"
					type="email"
					name="email"
					required={true}
					errMessage={errMessage?.['email']}
				/>
				<Input
					label="Password"
					type="password"
					name="password"
					required={true}
					errMessage={errMessage?.['password']}
				/>
				<div className="btn-group">
					<CustomButton type="submit" content="sign in" />
					<GoogleButton />
				</div>
			</form>
		</Col>
	);
}
