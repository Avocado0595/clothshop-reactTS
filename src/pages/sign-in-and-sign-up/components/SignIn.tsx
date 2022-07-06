import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import CustomButton from '../../../components/custom-button/CustomButton';
import GoogleButton from '../../../components/custom-button/GoogleButton';
import Input from './Input';
import initauth from '../../../firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

export default function SignIn(props:{
	handleChangeForm:(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>void,
	handleLoading:(e:boolean)=>void}) {
	const {handleChangeForm, handleLoading} = props;
	const [errMessage, setErrMessage] = useState<Record<string, string>>();
	const navigate = useNavigate();
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		handleLoading(true);
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
		navigate(-1);
		handleLoading(false);
	};

	return (
		<Col className="signform">
		
			<h4 className='form-title'>SIGN IN</h4>
			<span>If you don't have any account, <a onClick={(e)=>handleChangeForm(e)} href='#'>sign up here.</a></span>
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
				<Row className="mt-2 g-4 btn-group justify-content-space-between d-flex flex-lg-row flex-xl-row flex-column ">
					<CustomButton type="submit" content="Sign in" />
					<GoogleButton />
				</Row>
			</form>
		</Col>
	);
}
