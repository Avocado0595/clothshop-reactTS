import './CountButton.scss';
import leftIcon from '../../../asserts/caret-left.svg';
import { ReactSVG } from 'react-svg';
function CountButton() {
	return (
		<div className="">
			<ReactSVG src={leftIcon} />
		</div>
	);
}

export default CountButton;
