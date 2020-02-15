import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../../services/firebase';
import Layout from '../../components/Layout';

const Home = ({ history }) => {
	const onSignOut = () => {
		firebase.logout().then(() => history.push('/'));
	};

	if (!firebase.getCurrentUsername()) {
		return (
			<Layout>
				<Nav className="d-flex justify-content-end">
					<Link to="/register">
						<NavItem className="my-3 mx-3">Register</NavItem>
					</Link>
					<Link to="/login">
						<NavItem className="my-3 ml-3 mr-5">Login</NavItem>
					</Link>
				</Nav>
				<h1>NOT LOGGED IN</h1>
			</Layout>
		);
	}

	return (
		<Layout>
			<Nav className="d-flex justify-content-end">
				<a href="#">
					<NavItem className="my-3 mx-3" onClick={() => onSignOut()}>
						Log out
					</NavItem>
				</a>
			</Nav>
			<h1>LOGGED IN!!</h1>
			<h2>Hello {firebase.getCurrentUsername()}</h2>
		</Layout>
	);
};

export default withRouter(Home);
