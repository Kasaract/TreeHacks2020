import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, getIn } from 'formik';
// import { History } from 'history';
import * as yup from 'yup';

import firebase from '../../../services/firebase';

const LoginSchema = yup.object().shape({
	name: yup.string().required('Please enter a name'),
	email: yup
		.string()
		.required('Please enter your email')
		.email('Please enter a valid email'),
	password: yup.string().required('Please enter your password')
});

function RegisterForm({ history }) {
	// const [alert, setAlert] = useState({ message: null, type: null });

	const onSubmit = (values, actions) => {
		// setAlert({ message: null, type: null });
		onRegister(values.name, values.email, values.password).then(() => {
			history.replace('/');
		});
		console.log(values);
	};

	async function onRegister(name, email, password) {
		try {
			await firebase.register(name, email, password);
			await firebase.addNewUserToDB();
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: ''
			}}
			validationSchema={LoginSchema}
			onSubmit={onSubmit}
			render={({ errors, isSubmitting, touched }) => (
				<Form className="form-validate" autoComplete="off">
					<div className="form-group">
						<label className="form-label">Name</label>
						<Field
							name="name"
							placeholder="John Smith"
							className={
								getIn(errors, 'name') && getIn(touched, 'name')
									? 'form-control is-invalid'
									: 'form-control'
							}
						/>
						<ErrorMessage
							name="name"
							component="span"
							className="mt-1 text-danger small"
						/>
					</div>

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
						Register
					</button>
					<hr className="my-3" />
					<p className="text-sm text-center text-muted mb-0">
						Already have an account?&nbsp;
						<Link to="/login">Sign in</Link>!
					</p>
				</Form>
			)}
		/>
	);
}

export default withRouter(RegisterForm);
