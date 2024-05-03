import { Field, useFormikContext } from "formik";

function NameField() {
	const { setFieldValue } = useFormikContext();

	const handleNameChange = (e: any) => {
		const { value } = e.target;
		const filteredValue = value.replace(/[^A-Za-z ]/g, "");
		setFieldValue("name", filteredValue);
	};

	return <Field placeholder="Card name" name="name" type="text" className="form-control" onChange={handleNameChange} />;
}

export default NameField;
