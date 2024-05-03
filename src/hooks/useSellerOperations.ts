import useAPI, { DelegationStates, ItemResponse, ItemRequest } from "../api/useAPI";
import useAuthStore from "../stores/userStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSellerOperations = () => {
	const { postItem, updateItem, deleteItem, getAssessmentRequestsOnMyProduct, rejectAssessment, acceptAssessment } = useAPI();
	const navigate = useNavigate();
	const { id, username } = useAuthStore();

	const postNewItem = async (values: { name: string; description: string; price: number; delegationState: DelegationStates }) => {
		if (id && username) {
			const newItem: ItemRequest = {
				name: values.name,
				imgUrl: "/images/item-placeholder.jpg",
				description: values.description,
				price: values.price,
				delegationState: values.delegationState,
			};
			try {
				// @ts-ignore
				await postItem(newItem);
				toast.success("Item posted successfully");
				navigate("/seller-dashboard");
			} catch (ex: any) {
				toast.error(ex.message);
			}
		}
	};

	const updateUserItem = async (itemId: string, values: { name: string; description: string; price: number; delegationState: DelegationStates }) => {
		try {
			await updateItem(itemId, values);
			toast.success("Item updated successfully");
			navigate("/seller-dashboard");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	const deleteUserItem = async (itemId: string) => {
		try {
			await deleteItem(itemId);
			toast.success("Item deleted successfully");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	const getProductAssessments = async (productId: string) => {
		const assessments = await getAssessmentRequestsOnMyProduct(productId);
		return assessments;
	};

	/** Rearrange the products to put all SOLD products at last of the array */
	const arrangeProducts = (products: ItemResponse[]) => {
		return products.sort((a, b) => {
			if (a.isSold && !b.isSold) {
				// If 'a' is SOLD and 'b' is not, 'a' should come after 'b'
				return 1;
			} else if (!a.isSold && b.isSold) {
				// If 'a' is not SOLD and 'b' is, 'a' should come before 'b'
				return -1;
			}
			// If both are SOLD or both are not SOLD, keep their relative order unchanged
			return 0;
		});
	};

	const rejectProductAssessment = async (assessmentId: string) => {
		try {
			await rejectAssessment(assessmentId);
			toast.success("Assessment rejected successfully");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	const acceptProductAssessment = async (assessmentId: string) => {
		try {
			await acceptAssessment(assessmentId);
			toast.success("Assessment accepted successfully");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	return {
		postNewItem,
		updateUserItem,
		deleteUserItem,
		getProductAssessments,
		arrangeProducts,
		rejectProductAssessment,
		acceptProductAssessment,
	};
};

export default useSellerOperations;
