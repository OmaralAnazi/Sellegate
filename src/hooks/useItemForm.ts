import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI, { DelegationStates } from "../api/useAPI";
import useSellerOperations from "./useSellerOperations";
import { ItemFormInitialValues } from "../components/ItemForm";

function useItemForm(pageType: "edit" | "post") {
	const [initialValues, setInitialValues] = useState({ name: "", description: "", price: 0, delegationState: DelegationStates.PENDING });
	const { id: itemId } = useParams();
	const { getItem } = useAPI();
	const { updateUserItem, postNewItem } = useSellerOperations();

	useEffect(() => {
		if (pageType === "edit" && itemId) {
			getItem(itemId).then((item) => {
				setInitialValues({
					name: item.name || "",
					description: item.description || "",
					price: item.price || 0,
					delegationState: item.delegationState || DelegationStates.PENDING,
				});
			});
		}
	}, [itemId, pageType]);

	const handleSubmit = async (values: ItemFormInitialValues, { setSubmitting }: any) => {
		if (pageType === "edit" && itemId) {
			await updateUserItem(itemId, values);
		} else {
			await postNewItem(values);
		}
		setSubmitting(false);
	};

	return { initialValues, handleSubmit };
}

export default useItemForm;
