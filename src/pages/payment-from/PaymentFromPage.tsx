import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../api/useAPI";
import { toast } from "react-toastify";
import FormButton from "../../components/FormButton";
import NameField from "./NameField";
import CardNumberField from "./CardNumberField";
import CVVField from "./CVVField";

// TODO: Extract some logic outside of this component (maybe in another components (e.g., CustomForm) or in a custom hook)

function PaymentFormPage() {
	const { id: itemId } = useParams<{ id: string }>();
	const { buyItem } = useAPI();
	const navigate = useNavigate();

	const initialValues = {
		name: "",
		cardNumber: "",
		expirationDate: "",
		cvv: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.matches(/^[A-Za-z ]*$/, "Only letters are allowed")
			.required("Cardholder name is required"),
		cardNumber: Yup.string()
			.matches(/^(?:\d{4}-){3}\d{4}$/, "Card number must be in the format xxxx-xxxx-xxxx-xxxx")
			.required("Card number is required"),
		expirationDate: Yup.string()
			.required("Expiration date is required")
			.test("is-valid-date", "The card has expired", (value: any) => {
				const [expirationYear, expirationMonth] = value.split("-").map(Number);
				const currentDate = new Date();
				const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed.
				const currentYear = currentDate.getFullYear();
				return expirationYear > currentYear || (expirationYear === currentYear && expirationMonth >= currentMonth);
			}),
		cvv: Yup.string().required("CVV is required").length(3).matches(/\d{3}/, "CVV must be 3 digits"),
	});

	const handleSubmit = async ({ setSubmitting }: any) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (itemId) {
			try {
				await buyItem(itemId);
				toast.success("You've bought the item");
				navigate("/payment-history");
			} catch (ex: any) {
				toast.error(ex.message);
			}
		}
		setSubmitting(false);
	};

	return (
		<Container className="mt-5 border p-3 m" style={{ maxWidth: "720px" }}>
			<h2 className="text-center">Payment</h2>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<div className="form-group">
							<label htmlFor="name">Cardholder's Name</label>
							<NameField />
							<ErrorMessage name="name" component="div" className="text-danger" />
						</div>
						<br />

						<div className="form-group">
							<label htmlFor="cardNumber">Card Number</label>
							<CardNumberField />
							<ErrorMessage name="cardNumber" component="div" className="text-danger" />
						</div>
						<br />

						<Row>
							<Col>
								<div className="form-group">
									<label htmlFor="expirationDate">Expiration Date</label>
									<Field name="expirationDate" type="month" className="form-control" />
									<ErrorMessage name="expirationDate" component="div" className="text-danger" />
								</div>
							</Col>
							<Col>
								<div className="form-group">
									<label htmlFor="cvv">CVV</label>
									<CVVField />
									<ErrorMessage name="cvv" component="div" className="text-danger" />
								</div>
							</Col>
						</Row>
						<br />

						<FormButton isSubmitting={isSubmitting} buttonText="Confirm Payment" />
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default PaymentFormPage;
