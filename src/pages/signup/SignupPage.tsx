import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import FormButton from "../../components/FormButton";
import useAuth from "../../hooks/useAuth";

const SignupPage = () => {
	const initialValues = { username: "", email: "", password: "", confirmPassword: "" };
	const { handleSignup } = useAuth();

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.matches(/^[A-Za-z]+$/, "Only English letters are allowed")
			.required("Username is requierd"),
		email: Yup.string()
			.matches(/^[\x00-\x7F]+$/, "Password must contain only ASCII characters")
			.email("Invalid email")
			.required("Email is required"),
		password: Yup.string()
			.matches(/^[\x00-\x7F]+$/, "Password must contain only ASCII characters")
			.required("Password is required")
			.min(6, "Password must be at least 6 characters long"),
		confirmPassword: Yup.string()
			.matches(/^[\x00-\x7F]+$/, "Password must contain only ASCII characters")
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Confirm password is required"),
	});

	const handleSubmit = async (values: { username: string; email: string; password: string; confirmPassword: string }, { setSubmitting }: any) => {
		await handleSignup(values);
		setSubmitting(false);
	};

	return (
		<Container className="mt-5 border p-3" style={{ maxWidth: "720px" }}>
			<h2 className="text-center">Sign Up</h2>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<Field type="text" name="username" className="form-control" />
							<ErrorMessage name="username" component="div" className="text-danger" />
						</div>
						<br />

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

						<div className="form-group">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<Field type="password" name="confirmPassword" className="form-control" />
							<ErrorMessage name="confirmPassword" component="div" className="text-danger" />
						</div>
						<br />

						<FormButton isSubmitting={isSubmitting} buttonText="Sign Up" />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default SignupPage;
