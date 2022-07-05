import { FC } from 'react';
import './ErrorAlert.scss';
import { Alert } from 'react-bootstrap';
const ErrorAlert: FC<{ message: string }> = ({ message }) => {
	return (
		<Alert className="error-alert alert alert-danger" color="danger">
			{message}
		</Alert>
	);
};

export default ErrorAlert;
