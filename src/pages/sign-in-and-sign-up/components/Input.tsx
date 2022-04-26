import './Input.scss';
export default function Input(props: {
	label: string;
	name: string;
	type: string;
	required?: boolean;
}) {
	const { name, type, required, label } = props;
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
		</div>
	);
}
