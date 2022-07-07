import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ICollection from '../../redux/collection/collection.interface';
import './MenuItem.scss';
export default function MenuItem(props: { item: ICollection }) {
	const nav = useNavigate();
	const { item } = props;
	return (
		<Col
			key={item.id}
			className="m-1 col-lg-5 col-xl-5 col-md-5 col-sm-12 col-12 menu-item"
			onClick={() => {
				nav(`${item.routeName}`);
			}}
		>
			<div className="background-item">
				<img alt={item.title} src={item.imageUrl} />
			</div>
			<div className="content">
				<h1 className="title">{item.title.toUpperCase()}</h1>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</Col>
	);
}
