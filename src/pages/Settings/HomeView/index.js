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
					<div className = "my-3">
						<Field as="select" name="homeView" placeholder="Europe">
							<option value="option 1">View 1</option>
							<option value="option 2">View 2</option>
							<option value="option 3">View 3</option>
						</Field>
					</div>
					
					{values.homeView === 'option 3' && (
						<>
							{/* <Field as="select" name="continent" placeholder="Country">
								<option value="option 1">Asia</option>
								<option value="option 2">North America</option>
								<option value="option 3">Europe</option>
							</Field> */}
							<div className="row justify-content-center my-2 col-xs-6">
								<div className = "mr-2">
									<Field as="select" name="region" placeholder="Country">
										<option value="option 1">Northeast</option>
										<option value="option 2">South</option>
										<option value="option 3">West</option>
									</Field>
								</div>
								<div className = "ml-2">
									<Field as="select" name="province" placeholder="Country">
										<option value="option 1">New York</option>
										<option value="option 2">Texas</option>
										<option value="option 3">Mississippi</option>
									</Field>
								</div>
							</div>	
						</>
					)}
					<div>
						<button
							className="btn btn-lg btn-primary my-1"
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

export default withRouter(HomeView);
