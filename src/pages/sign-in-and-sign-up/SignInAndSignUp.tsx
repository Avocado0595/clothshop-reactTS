import React from 'react';
import { Container, Row } from 'reactstrap';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './SignInAndSignUp.scss';
export default function SignInAndSignUp() {
	return (
		<Container className="signin-and-signup">
			<Row lg="2" sm="1">
				<SignIn />
				<div className='breaker'><p>OR</p></div>
				<SignUp />
			</Row>
		</Container>
	);
}
