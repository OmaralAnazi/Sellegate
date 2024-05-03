import { Field, useFormikContext } from "formik";

function CVVField() {
	const { setFieldValue } = useFormikContext();

	const handleCVVChange = (e: any) => {
		const { value } = e.target;
		const filteredValue = value.replace(/[^0-9]/g, "");
		setFieldValue("cvv", filteredValue);
	};

	return <Field placeholder="CVV" name="cvv" type="text" maxLength="3" className="form-control" onChange={handleCVVChange} />;
}

export default CVVField;
