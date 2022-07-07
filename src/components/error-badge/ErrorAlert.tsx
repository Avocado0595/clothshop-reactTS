import './ErrorAlert.scss';
import { Alert } from 'react-bootstrap';
const ErrorAlert = (props: { message: string }) => {
	const { message } = props;
	return (
		<Alert className="error-alert alert alert-danger" color="danger">
			{message}
		</Alert>
	);
};

export default ErrorAlert;
