import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ICollection from '../../interfaces/ICollection';
import './MenuItem.scss';
export default function MenuItem(props: { item: ICollection }) {
	const nav = useNavigate();
	const { item } = props;
	return (
		<Col style={{height:'300px'}} className="m-1 col-lg-3 col-xl-3 col-md-5 col-sm-12 col-12 menu-item"
			onClick={() => {
				nav(item.routeName);
			}}
		>
			<div
				className="background-item"
				style={{ backgroundImage: `url(${item.imageUrl})` }}
			></div>
			<div className="content">
				<h1 className="title">{item.title.toUpperCase()}</h1>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</Col>
	);
}
