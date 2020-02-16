import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

function HomeView({}) {
	// const onSubmit = (values, actions) => {};
	const onSubmit = () => {};

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
						<option value="option 1">View 1</option>
						<option value="option 2">View 2</option>
						<option value="option 3">View 3</option>
					</Field>
					{values.homeView === 'option 3' && (
						<>
							<Field as="select" name="continent" placeholder="Country">
								<option value="option 1">Asia</option>
								<option value="option 2">North America</option>
								<option value="option 3">Europe</option>
							</Field>
							<Field as="select" name="region" placeholder="Country">
								<option value="option 1">Northeast</option>
								<option value="option 2">South</option>
								<option value="option 3">West</option>
							</Field>
							<Field as="select" name="province" placeholder="Country">
								<option value="option 1">New York</option>
								<option value="option 2">Texas</option>
								<option value="option 3">Mississippi</option>
							</Field>
						</>
					)}
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

export default withRouter(HomeView);
