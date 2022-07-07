import { ReactSVG } from 'react-svg';
import loadingSVG from '../../asserts/loading.svg';
import './Loading.scss';
const Loading = () => {
	return <ReactSVG src={loadingSVG} className="loading-svg" />;
};

export default Loading;
