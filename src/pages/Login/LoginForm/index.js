import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as yup from 'yup';

import firebase from '../../../services/firebase';

const LoginSchema = yup.object().shape({
	email: yup
		.string()
		.required('Please enter your email')
		.email('Please enter a valid email'),
	password: yup.string().required('Please enter your password')
});

function LoginForm({ history }) {
	// const [alert, setAlert] = useState({ message: null, type: null });

	const uiConfig = {
		...firebase.getUIConfig(),
		callbacks: {
			signInSuccessWithAuthResult: () => history.push('/')
		}
	};

	const onSubmit = (values, actions) => {
		// setAlert({ message: null, type: null });
		// login(values.email, values.password)
		//   .then(() => {
		//     setTimeout(() => {
		//       history.push('/');
		//       return actions.setSubmitting(false);
		//     }, 2000);
		//   })
		//   .catch((err) => {
		//     setAlert({ message: err.response.data.message, type: AlertTypes.danger });
		//     return actions.setSubmitting(false);
		//   });
		firebase.login(values.email, values.password).then(() => {
			history.push('/');
		});
	};

	return (
		<Formik
			initialValues={{
				email: '',
				password: ''
			}}
			validationSchema={LoginSchema}
			onSubmit={onSubmit}
			render={({ errors, isSubmitting, touched }) => (
				<Form className="form-validate" autoComplete="off">
					<div className="form-group">
						<label className="form-label">Email address</label>
						<Field
							name="email"
							placeholder="name@address.com"
							className={
								getIn(errors, 'email') && getIn(touched, 'email')
									? 'form-control is-invalid'
									: 'form-control'
							}
						/>
						<ErrorMessage
							name="email"
							component="span"
							className="mt-1 text-danger small"
						/>
					</div>

					<div className="form-group">
						<label className="form-label">Password</label>
						<Field
							name="password"
							placeholder="Password"
							type="password"
							component="input"
							className={
								getIn(errors, 'password') && getIn(touched, 'password')
									? 'form-control is-invalid'
									: 'form-control'
							}
						/>
						<ErrorMessage
							name="password"
							component="span"
							className="mt-1 text-danger small"
						/>
					</div>
					<button
						className="btn btn-lg btn-block btn-primary"
						type="submit"
						disabled={isSubmitting}
					>
						Sign in
					</button>
					<hr className="my-3" />
					<StyledFirebaseAuth
						uiConfig={uiConfig}
						firebaseAuth={firebase.getAuth()}
					/>
					<hr className="my-3" />
					<p className="text-sm text-center text-muted mb-0">
						Don't have an account?&nbsp;
						<Link to="/register">Register</Link>
					</p>
				</Form>
			)}
		/>
	);
}

export default withRouter(LoginForm);
