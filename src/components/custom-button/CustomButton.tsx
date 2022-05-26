import React from 'react';
import './CustomButton.scss';
export default function CustomButton(props: {
	content: string;
	type: 'button' | 'submit' | 'reset' | undefined;
}) {
	return (
		<button disabled={false} className="custom-btn" type={props.type}>
			{props.content.toUpperCase()}
		</button>
	);
}
