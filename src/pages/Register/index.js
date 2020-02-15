import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout/';
// import LoginForm from './components/RegisterForm/RegisterForm';

const Register = () => {
	return (
		<Layout>
			<Container className="min-vh-100">
				<div className="row vh-100 pt-nav align-items-center">
					<div className="col py-auto justify-content-center">
						<div className="d-flex justify-content-center my-3">
							<Link to="/">
								<FontAwesomeIcon
									icon={faWarehouse}
									style={{ height: '4rem', width: '4rem' }}
								/>
							</Link>
						</div>
						<div className="card mx-auto w-100 w-md-75 w-lg-50">
							<div className="card-header font-weight-bold h4">Register</div>
							<div className="card-body">
								{/* <LoginForm /> */}
								Filler formmm
							</div>
						</div>
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default Register;
