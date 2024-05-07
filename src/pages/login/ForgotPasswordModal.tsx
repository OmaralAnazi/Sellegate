import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormButton from "../../components/FormButton";
import { toast } from "react-toastify";

interface ForgotPasswordModalProps {
	show: boolean;
	onClose: () => void;
}

const ForgotPasswordModal = ({ show, onClose }: ForgotPasswordModalProps) => {
	const initialValues = { email: "" };

	const validationSchema = Yup.object({
		email: Yup.string()
			.matches(/^[\x00-\x7F]+$/, "Password must contain only ASCII characters")
			.email("Invalid email address")
			.required("Email is required"),
	});

	const handleSubmit = (values: { email: string }, { setSubmitting, resetForm }: any) => {
		// TODO: implement this in the backend, and use it here!
		toast.info("If the email is registered, you will receive a password reset link.");
		resetForm();
		setSubmitting(false);
		onClose();
	};

	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Forgot Password</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
					{({ isSubmitting }) => (
						<Form>
							<div className="form-group">
								<label htmlFor="email">Email address</label>
								<Field type="email" name="email" placeholder="Enter email" className="form-control" />
								<ErrorMessage name="email" component="div" className="text-danger" />
							</div>
							<Modal.Footer>
								<Button variant="secondary" onClick={onClose}>
									Close
								</Button>
								<FormButton isSubmitting={isSubmitting} buttonText="Send Reset Link" expand={false} />
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default ForgotPasswordModal;
