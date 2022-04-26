import IProduct from '../../interfaces/IProduct';
import './PreviewCollection.scss';
export default function PreviewCollection(props: {
	title: string;
	itemList: IProduct[];
}) {
	return (
		<div className="collection-preview">
			<h2 className="title">{props.title.toUpperCase()}</h2>
			<div className="preview">
				{props.itemList.map((item) => (
					<div className="preview-item" key={item.id}>
						<div
							className="item-img"
							style={{ backgroundImage: `url(${item.imageUrl})` }}
						>
							<div className="item-modal"></div>
							<div className="item-addcart">
								<p>ADD TO CART</p>
							</div>
						</div>
						<div className="item-info">
							<div className="item-info--name">{item.name}</div>
							<div className="item-info--price">
								${item.price}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
