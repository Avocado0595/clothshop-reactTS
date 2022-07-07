import { Breadcrumb } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentProduct } from '../../redux/product/product.slice';
import { RootState } from '../../redux/store';
export default function BreadcrumbCustom() {
	const breadcrumbs = useBreadcrumbs();
	const currentProduct = useAppSelector((state: RootState) =>
		selectCurrentProduct(state)
	);
	const breadcrumbList = breadcrumbs.map(({ match, breadcrumb }) => {
		const arrMatch = match.pathname.split('/');
		const name = arrMatch[arrMatch.length - 1];

		if (name == currentProduct?.id)
			return (
				<li className="breadcrumb-item" key={match.pathname}>
					<Link to={match.pathname}>{currentProduct?.name}</Link>
				</li>
			);

		return (
			<li className="breadcrumb-item" key={match.pathname}>
				<Link to={match.pathname}>{breadcrumb}</Link>
			</li>
		);
	});
	return (
		<Container>
			<Breadcrumb>
				{breadcrumbList.length > 1 ? breadcrumbList : null}
			</Breadcrumb>
		</Container>
	);
}
