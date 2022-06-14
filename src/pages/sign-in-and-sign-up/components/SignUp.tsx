import React, { useState } from 'react';
import CustomButton from '../../../components/custom-button/CustomButton';
import Input from './Input';
import './SignUp.scss';
import { createUser } from '../../../firebase/firebase.utils';
import './SignUp.scss';
import { Col } from 'reactstrap';
import Loading from '../../../components/loading-icon/Loading';

export default function SignUp() {
	const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<Record<string, string>>();
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setIsLoadingState(true);
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
			if (password !== confirmPassword)
				throw new Error(
					'The password and confirmation password do not match.'
				);
			await createUser({ email, password, displayName });
		} catch (e) {
			if ((e as Error).message.toLowerCase().includes('email')) {
				setErrMessage({ email: 'Already exist email.' });
			}
			if ((e as Error).message.toLowerCase().includes('password')) {
				setErrMessage({ password: 'Invalid password.' });
			}
			if ((e as Error).message.toLowerCase().includes('confirmation')) {
				setErrMessage({ confirmPassword: (e as Error).message });
			}
		}
		setIsLoadingState(false);
	};

	return (
		<Col className="sign-up">
			{isLoadingState ? (
				<div className="loading-modal">
					<Loading />
				</div>
			) : null}
			<h2>If you don't have any account</h2>
			<span>Sign up with your email and password here.</span>
			<form onSubmit={handleSubmit}>
				<Input
					label="Display name"
					type="text"
					name="name"
					required={true}
					errMessage={errMessage?.['name']}
				/>
				<Input
					label="Email"
					type="email"
					name="emailSignUp"
					required={true}
					errMessage={errMessage?.['email']}
				/>
				<Input
					label="Password"
					type="password"
					name="passwordSignUp"
					required={true}
					errMessage={errMessage?.['password']}
				/>
				<Input
					label="Confirm password"
					type="password"
					name="confirmPassword"
					required={true}
					errMessage={errMessage?.['confirmPassword']}
				/>
				<div className="btn-group">
					<CustomButton type="submit" content="sign up" />
				</div>
			</form>
		</Col>
	);
}
