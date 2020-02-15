import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

function Loader() {
	return (
		<Jumbotron className="bg-white d-flex align-items-center vh-100">
			<Container>
				<div className="text-center">
					<div className="spinner-border text-primary" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			</Container>
		</Jumbotron>
	);
}

export default Loader;
