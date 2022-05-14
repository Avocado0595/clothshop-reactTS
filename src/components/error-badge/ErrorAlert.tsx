import React, { FC } from 'react';
import './ErrorAlert.scss';
const ErrorAlert: FC<{ message: string }> = ({ message }) => {
	return <div className="error-alert">{message}</div>;
};

export default ErrorAlert;
