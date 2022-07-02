
import './GoogleButton.scss';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import initauth from '../../firebase/firebase.utils';
import googleLogo from '../../asserts/google.png';
import { Button, Col } from 'react-bootstrap';
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export default function GoogleButton() {
	const handleGoogleSignIn = async () => {
		signInWithPopup(initauth, provider)
	};
	return (
		<Col>
		<Button
			type="button"
			onClick={handleGoogleSignIn}
			className="google-btn"
		>
			<img className="google-btn--logo" src={googleLogo} />
			Sign in with Google
		</Button>
		</Col>
	);
}
