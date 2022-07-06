import React, { useState } from 'react';
import CustomButton from '../../../components/custom-button/CustomButton';
import Input from './Input';
import { createUser } from '../../../firebase/firebase.utils';
import { Container,Col } from 'react-bootstrap';


export default function SignUp(props:{
	handleChangeForm:(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>void,
	handleLoading:(e:boolean)=>void}) {
	const {handleChangeForm, handleLoading} = props;
	const [errMessage, setErrMessage] = useState<Record<string, string>>();
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		handleLoading(true);
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
				setErrMessage({ password: 'Your password is so weak.' });
			}
			if ((e as Error).message.toLowerCase().includes('confirmation')) {
				setErrMessage({ confirmPassword: (e as Error).message});
			}
		}
		handleLoading(false);
	};

	return (
		<Col className="signform">
			<h4 className='form-title'>SIGN UP</h4>
			<span>If you aldready have an account, <a onClick={e=>handleChangeForm(e)} href='#'>sign in here.</a></span>
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
				<Container className="mt-4">
					<CustomButton type="submit" content="Sign up" />
				</Container>
			</form>
		</Col>
	);
}
