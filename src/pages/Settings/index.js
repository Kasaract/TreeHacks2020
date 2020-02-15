import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import HomeView from './HomeView';
import Topics from './Topics';
import Notifications from './Notifications';
// import LoginForm from './LoginForm';

const Settings = () => {
	return (
		<Layout>
			<Container className="min-vh-100">
				<div className="row vh-100 pt-nav align-items-center">
					<div className="col py-auto justify-content-center">
						<div className="d-flex justify-content-center my-3">
							<Link to="/">
								<FontAwesomeIcon
									icon={faWarehouse}
									style={{ height: '2rem', width: '2rem' }}
								/>
							</Link>
						</div>
						<div className="mx-auto w-100 w-md-75 w-lg-50">
							<div className="font-weight-bold h1">Settings</div>
							{/* <LoginForm /> */}
							<div className="font-weight h4">Home View</div>
							<HomeView />
							<div className="font-weight h4">Topics</div>
							<Topics />
							<div className="font-weight h4">Notification Preferences</div>
							<Notifications />
						</div>
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default Settings;
