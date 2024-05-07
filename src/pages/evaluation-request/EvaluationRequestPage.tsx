import { useNavigate, useParams } from "react-router-dom";
import useAPI, { AssessmentRequest } from "../../api/useAPI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import FormButton from "../../components/FormButton";
import { toast } from "react-toastify";

function EvaluationRequestPage() {
	const { sendAssessmentRequest } = useAPI();
	const { id: itemId } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const initialValues = {
		name: "",
		message: "",
		price: 0,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("This field is required"),
		message: Yup.string().required("This field is required"),
		price: Yup.number().positive("Price must be a positive number").moreThan(0).required("Price is required"),
	});

	const handleSendingAssessment = async (values: { name: string; message: string; price: number }, { setSubmitting }: any) => {
		if (!itemId) return;
		try {
			const requestBody: AssessmentRequest = { itemId, ...values };
			await sendAssessmentRequest(requestBody);
			toast.success("Assessment request sent successfully");
			setSubmitting(false);
			navigate("/evaluator-dashboard");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	return (
		<Container className="mt-5 border p-3 shadow" style={{ maxWidth: "720px", borderRadius: "10px" }}>
			<h1 className="text-center">Assessment Request</h1>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSendingAssessment}>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="name">Assessment Title</label>
							<Field type="text" name="name" className="form-control" />
							<ErrorMessage name="name" component="div" className="text-danger" />
						</div>
						<br />

						<div className="form-group">
							<label htmlFor="message">Message</label>
							<Field as="textarea" name="message" className="form-control" />
							<ErrorMessage name="message" component="div" className="text-danger" />
						</div>
						<br />

						<div className="form-group">
							<label htmlFor="price">Estimated Price</label>
							<Field type="number" name="price" className="form-control" />
							<ErrorMessage name="price" component="div" className="text-danger" />
						</div>
						<br />

						<FormButton isSubmitting={isSubmitting} buttonText="Send" />
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default EvaluationRequestPage;
