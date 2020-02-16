import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
import { Col, Row, Form as FormBootstrap } from 'react-bootstrap';

const listOfTopics = ['Education', 'Technology', 'Politics'];

function Topics({ history }) {
	const [topics, setTopics] = useState(['Education']);

	const onSubmit = (values, actions) => {};

	return (
		<Formik
			initialValues={{
				homeView: '',
				continent: '',
				region: '',
				province: ''
			}}
			onSubmit={onSubmit}
			render={({ errors, isSubmitting, touched, values }) => (
				<Form className="form-validate" autoComplete="off">
					<Field as="select" name="homeView" placeholder="Europe">
						{listOfTopics.map(topic => (
							<option value={topic}>{topic}</option>
						))}
					</Field>

					<button
						className="btn btn-lg btn-primary"
						type="submit"
						disabled={isSubmitting}
					>
						Save Changes
					</button>
				</Form>
			)}
		/>
	);
}

export default withRouter(Topics);