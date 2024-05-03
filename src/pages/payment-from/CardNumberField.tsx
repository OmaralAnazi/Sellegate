import { Field, useFormikContext } from "formik";

function CardNumberField() {
	const { setFieldValue } = useFormikContext();

	const handleCardNumberChange = (e: any) => {
		let { value } = e.target;
		value = value.replace(/\D/g, "");
		// @ts-ignore
		value = value.replace(/(\d{4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, function (_, $1, $2, $3, $4) {
			return $2 ? $1 + "-" + $2 + ($3 ? "-" + $3 : "") + ($4 ? "-" + $4 : "") : $1;
		});
		setFieldValue("cardNumber", value);
	};

	return (
		<Field
			placeholder="xxxx-xxxx-xxxx-xxxx"
			name="cardNumber"
			type="text"
			onChange={handleCardNumberChange}
			maxLength="19" // 16 digits + 3 dashes
			className="form-control"
		/>
	);
}

export default CardNumberField;
