import useItemForm from "../../hooks/useItemForm";
import ItemForm from "../../components/ItemForm";

function EditItemPage() {
	const { initialValues, handleSubmit } = useItemForm("edit");
	return <ItemForm initialValues={initialValues} onSubmit={handleSubmit} buttonText="Update Item" formTitle={"Edit Item"} />;
}

export default EditItemPage;
