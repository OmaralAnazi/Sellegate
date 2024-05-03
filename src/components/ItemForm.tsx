import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import FormButton from "./FormButton";
import { DelegationStates } from "../api/useAPI";

export interface ItemFormInitialValues {
	name: string;
	description: string;
	price: number;
	delegationState: DelegationStates;
}

interface ItemFormProps {
	initialValues: ItemFormInitialValues;
	onSubmit: (values: ItemFormInitialValues, { setSubmitting }: any) => void;
	formTitle: string;
	buttonText: string;
}

function ItemForm({ initialValues, onSubmit, formTitle, buttonText }: ItemFormProps) {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Item name is required"),
		description: Yup.string().required("Description is required"),
		price: Yup.number().positive("Price must be a positive number").moreThan(0).required("Price is required"),
		delegationState: Yup.string().required("Price is required"),
	});

	return (
		<Container className="mt-5 border p-3" style={{ maxWidth: "920px" }}>
			<Row>
				<Col md={6} className="text-center my-3">
					<img src="/images/item-placeholder.jpg" className="img-fluid" />
				</Col>
				<Col md={6}>
					<h2>{formTitle}</h2>
					<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
						{({ isSubmitting }) => (
							<Form className="d-flex flex-column gap-3" style={{ width: "100%" }}>
								<Row>
									<Col md={12}>
										<div className="form-group">
											<label htmlFor="name">Item Name</label>
											<Field type="text" name="name" className="form-control" />
											<ErrorMessage name="name" component="div" className="text-danger" />
										</div>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<div className="form-group">
											<label htmlFor="description">Description</label>
											<Field as="textarea" name="description" className="form-control" rows="3" />
											<ErrorMessage name="description" component="div" className="text-danger" />
										</div>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<div className="form-group">
											<label htmlFor="price">Price (SAR)</label>
											<Field type="number" name="price" className="form-control" />
											<ErrorMessage name="price" component="div" className="text-danger" />
										</div>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<div className="form-group">
											<label htmlFor="delegationState">Receive assessment requests from evalouters</label>
											<br />
											<Field as="select" name="delegationState" style={{ width: "100%" }}>
												<option value={DelegationStates.PENDING}>Allow</option>
												<option value={DelegationStates.INDEPENDENT}>Do not allow</option>
											</Field>
										</div>
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<FormButton isSubmitting={isSubmitting} buttonText={buttonText} />
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
	);
}

export default ItemForm;
