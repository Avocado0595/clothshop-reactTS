import { FC } from 'react';
import ErrorAlert from '../../../components/error-badge/ErrorAlert';
import './Input.scss';
const Input:FC< {
	label: string;
	name: string;
	type: string;
	required?: boolean;
	errMessage?: string;
}> = ({ name, type, required, label, errMessage }) => {

	return (
		<div className="form-group">
			<input
				placeholder=" "
				className="form-group__input"
				required={required}
				type={type}
				id={name}
				name={name}
			/>
			<label className="form-group__label" htmlFor={name}>
				{label}
			</label>
			{errMessage ? <ErrorAlert message={errMessage} /> : null}
		</div>
	);
}

export default Input;
