import './Header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../asserts/crown.svg';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import CartIcon from '../cart/cart-icon/CartIcon';
import SearchInput from '../search-input/SearchInput';
import {Col,Container,Modal,Navbar,Row,} from 'react-bootstrap';
import HeaderNav from '../nav/HeaderNav';

const Header = () => {
	
	const [show, setShow] = useState(false);
	
	const handleShow = () => {
		setShow(true);
	};

	return (
		<Navbar className="header-nav" bg="light" expand="lg" fixed="top">
			<Container className="flex-column">
				<Row className="flex-nowrap justify-content-between w-100">
					<Col className="justify-content-start d-lg-none d-xl-none col-md-2 d-md-flex d-xs-flex">
						<Navbar.Toggle className="ms-0" onClick={handleShow} />
					</Col>

					<Col className='d-flex col-md-8 col-lg-4 col-xl-4'>
						<Link className="header-link mx-auto" to="/">
							<div className="header-link--inner">
								<ReactSVG className="header-logo" src={Logo} />
								<h1 className="d-none d-md-block">
									MY CLOTH SHOP
								</h1>
							</div>
						</Link>
					</Col>

					<Col className="d-none d-md-none d-lg-flex d-xl-flex">
						<SearchInput />
					</Col>

					<Col className="d-flex justify-content-end">
						
						<Navbar
							style={{ minWidth: '270px' }}
							className=" flex-nowrap d-xl-flex d-lg-flex d-md-none align-items-end justify-content-end d-none "
						>
							<HeaderNav setShow={setShow}/>
						</Navbar>
						<CartIcon />
					</Col>
				</Row>
			</Container>
			<Modal
				show={show}
				fullscreen="lg-down"
				onHide={() => setShow(false)}
				
			>
				<Modal.Header closeButton>
					<Modal.Title><Link onClick={() => setShow(false)} to="/">HOME</Link></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<HeaderNav setShow={setShow}/>
							<SearchInput />
				</Modal.Body>
			</Modal>
		</Navbar>
		
	);
};

export default Header;
