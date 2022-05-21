import { FC } from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Dispatch } from 'redux';
import IProduct from '../../interfaces/IProduct';
import { addItem } from '../../redux/cart/cart.action';
import { IRootReducer } from '../../redux/rootReducer';
import './PreviewCollection.scss';
const PreviewCollection: FC<{
	addItem: (item: IProduct) => any;
	title: string;
	itemList: IProduct[];
}> = ({ addItem, title, itemList }) => {
	return (
		<Container className="collection-preview">
			<h2 className="title">{title.toUpperCase()}</h2>
			<Row xs="2" md="3" lg="4" className="preview">
				{itemList.map((item) => (
					<Col className="preview-item" key={item.id}>
						<div
							className="item-img"
							style={{ backgroundImage: `url(${item.imageUrl})` }}
						>
							<div className="item-modal"></div>
							<div
								onClick={() => addItem(item)}
								className="item-addcart"
							>
								<p>ADD TO CART</p>
							</div>
						</div>
						<div className="item-info">
							<div className="item-info--name">{item.name}</div>
							<div className="item-info--price">
								${item.price}
							</div>
						</div>
					</Col>
				))}
			</Row>
		</Container>
	);
};

const mapDispatchToProp = (dispatch: Dispatch) => ({
	addItem: (item: IProduct) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProp)(PreviewCollection);
