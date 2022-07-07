import ErrorAlert from '../../../components/error-badge/ErrorAlert';
import './Input.scss';
const Input = (props: {
	label: string;
	name: string;
	type: string;
	required?: boolean;
	errMessage?: string;
}) => {
	const { name, type, required, label, errMessage } = props;
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
};

export default Input;
