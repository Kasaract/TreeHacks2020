import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

const listOfNotifications = ['Weekly', 'Monthly'];

function Notifications({ history }) {
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
							{listOfNotifications.map(notifOption => (
								<option value={notifOption}>{notifOption}</option>
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

export default withRouter(Notifications);
