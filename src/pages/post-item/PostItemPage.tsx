import useItemForm from "../../hooks/useItemForm";
import ItemForm from "../../components/ItemForm";

function PostItemPage() {
	const { initialValues, handleSubmit } = useItemForm("post");
	return <ItemForm initialValues={initialValues} onSubmit={handleSubmit} buttonText="Post Item" formTitle="Post New Item" />;
}

export default PostItemPage;
