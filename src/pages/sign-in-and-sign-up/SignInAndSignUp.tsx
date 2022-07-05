import { useState } from 'react';
import LoadingPage from '../loading-page/LoadingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './SignInAndSignUp.scss';

export default function SignInAndSignUp() {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [isLoading, setLoading] = useState<boolean>(false);
	const handleChangeForm = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
		e.preventDefault();
		setIsLogin(!isLogin)
	}
	const handleLoading = (isLoading:boolean)=>{
		setLoading(isLoading);
	}
	return (
		<div className="signin-and-signup authform-outline">
			{isLogin?<SignIn handleLoading={handleLoading} handleChangeForm={handleChangeForm}/>:
			<SignUp handleLoading={handleLoading} handleChangeForm={handleChangeForm}/>}
			{isLoading?<div className="loading-modal">
					<LoadingPage />
				</div>:null}
		</div>
	);
}
