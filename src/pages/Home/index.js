import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => (
	<Nav className="d-flex justify-content-end">
		<Link to="/register">
			<NavItem className="my-3 mx-3">Register</NavItem>
		</Link>
		<Link to="/login">
			<NavItem className="my-3 ml-3 mr-5">Login</NavItem>
		</Link>
	</Nav>
);

export default Home;
