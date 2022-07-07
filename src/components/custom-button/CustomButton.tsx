import { Button, Col } from 'react-bootstrap';
import './CustomButton.scss';
export default function CustomButton(props: {
	content: string;
	type: 'button' | 'submit' | 'reset' | undefined;
}) {
	return (
		<Col>
			<Button
				style={{ borderColor: 'black', backgroundColor: 'black' }}
				disabled={false}
				className="custom-btn"
				type={props.type}
			>
				{props.content}
			</Button>
		</Col>
	);
}
