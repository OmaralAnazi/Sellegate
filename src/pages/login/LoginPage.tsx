import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import ForgotPasswordModal from "./ForgotPasswordModal";
import FormButton from "../../components/FormButton";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
	const initialValues = { email: "", password: "" };
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const { handleLogin } = useAuth();

	const showModal = () => setShowForgotPassword(true);
	const hideModal = () => setShowForgotPassword(false);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.matches(/^[\x00-\x7F]+$/, "Password must contain only ASCII characters")
			.email("Invalid email")
			.required("Email is required"),
		password: Yup.string()
			.matches(/^[\x00-\x7F]+$/, "Password must contain only ASCII characters")
			.required("Password is required"),
	});

	const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
		await handleLogin(values);
		setSubmitting(false);
	};

	return (
		<Container className="mt-5 border p-3 m" style={{ maxWidth: "720px" }}>
			<h2 className="text-center">Login</h2>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<Field type="text" name="email" className="form-control" />
							<ErrorMessage name="email" component="div" className="text-danger" />
						</div>
						<br />

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<Field type="password" name="password" className="form-control" />
							<ErrorMessage name="password" component="div" className="text-danger" />
						</div>
						<br />

						<FormButton isSubmitting={isSubmitting} buttonText="Log in" />

						<div className="text-center">
							<br />
							<button type="button" className="btn btn-link" onClick={showModal}>
								Forgot Password?
							</button>
						</div>
					</Form>
				)}
			</Formik>

			<ForgotPasswordModal show={showForgotPassword} onClose={hideModal} />
		</Container>
	);
};

export default LoginPage;
