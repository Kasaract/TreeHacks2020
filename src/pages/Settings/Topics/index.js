import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

const listOfTopics = ['Education', 'Technology', 'Politics'];

function Topics({ history }) {
	// const [topics, setTopics] = useState(['Education']);

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
						<div className = "my-3">
							<Field as="select" name="homeView" placeholder="Europe">
								{listOfTopics.map(topic => (
									<option value={topic}>{topic}</option>
								))}
							</Field>
						</div>
						<div className = "my-3">
							<button
								className="btn btn-lg btn-primary"
								type="submit"
								disabled={isSubmitting}
							>
								Save Changes
							</button>
						</div>
						

						
					</Form>

				
			)}
		/>
	);
}

export default withRouter(Topics);
