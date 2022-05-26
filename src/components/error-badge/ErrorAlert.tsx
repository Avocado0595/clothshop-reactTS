import { FC } from 'react';
import './ErrorAlert.scss';
import { Alert } from 'reactstrap';
const ErrorAlert: FC<{ message: string }> = ({ message }) => {
	return (
		<Alert fade={true} className="error-alert" color="danger">
			{message}
		</Alert>
	);
};

export default ErrorAlert;
