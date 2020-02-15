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
					<Field as="select" name="homeView" placeholder="Europe">
						{listOfNotifications.map(notifOption => (
							<option value={notifOption}>{notifOption}</option>
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

export default withRouter(Notifications);
