import axios from "axios";
import useAuthStore from "../stores/userStore";
import { AssessmentRequest, AssessmentResponse, AuthResponse, ItemRequest, ItemResponse, LoginRequest, SignupRequest, PaymentResponse } from "./useAPI";

// Note, we have faced a few problems with integration, so the current API calls are NOT optimized at all...

const useAPIDjango = () => {
	const { token } = useAuthStore();
	const API_URL = import.meta.env.VITE_API_URL_DJANGO;

	const api = axios.create({
		baseURL: API_URL,
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
	});

	const signup = async (signupData: SignupRequest): Promise<AuthResponse> => {
		try {
			const response = await api.post("/auth/register/", signupData);
			const userData: AuthResponse = { ...response.data, isEvaluator: response.data.is_evaluator };
			return userData;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.details) {
				const errorMessages = [];

				for (const [key, value] of Object.entries(ex.response.data.error.details)) {
					// @ts-ignore
					errorMessages.push(`${value.join(", ")}`);
				}

				throw new Error(errorMessages.join(" "));
			}
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during sign up.");
		}
	};

	const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
		try {
			const response = await api.post("/auth/login/", loginData);
			const userData: AuthResponse = { ...response.data, isEvaluator: response.data.is_evaluator };
			return userData;
		} catch (ex: any) {
			if (ex?.code === "ERR_BAD_REQUEST") throw new Error("Invalid email or password");
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during log in.");
		}
	};

	const relogin = async (): Promise<AuthResponse> => {
		try {
			const response = await api.get("/auth/token-status/");
			const userData: AuthResponse = { ...response.data.user_details, isEvaluator: response.data.user_details.is_evaluator };
			return userData;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during log in.");
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await api.post("/auth/logout/");
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during loginng out.");
		}
	};

	const getUserProfile = async (userId: string): Promise<AuthResponse> => {
		try {
			const response = await api.get(`/auth/user/${userId}/`);
			const userData: AuthResponse = { ...response.data, isEvaluator: response.data.is_evaluator };
			return userData;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching user data.");
		}
	};

	const updateUser = async (userId_IGNORED: string, values: Partial<AuthResponse>): Promise<void> => {
		try {
			await api.patch(`/auth/update-user/`, values);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during updating user data.");
		}
	};

	const getAllItems = async (): Promise<ItemResponse[]> => {
		try {
			const response = await api.get("/items/");
			const items: ItemResponse[] = response.data.map((item: any) => reformatItemResponse(item));
			return items;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching items data.");
		}
	};

	const getItemsToExplore = async (): Promise<ItemResponse[]> => {
		try {
			const response = await api.get("/items/explore/");
			const items: ItemResponse[] = response.data.map((item: any) => reformatItemResponse(item));
			return items;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching items data.");
		}
	};

	const getItem = async (itemId: string): Promise<ItemResponse> => {
		try {
			const response = await api.get(`/items/${itemId}/`);
			const item: ItemResponse = reformatItemResponse(response.data);
			return item;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching item data.");
		}
	};

	const getUserProducts = async (): Promise<ItemResponse[]> => {
		try {
			const response = await api.get("/items/user-products/");
			const items: ItemResponse[] = response.data.map((item: any) => reformatItemResponse(item));
			return items;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching items data.");
		}
	};

	const postItem = async (item: ItemRequest): Promise<void> => {
		try {
			const itemData = reformatItemRequest(item);
			await api.post("/items/post-item/", itemData);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during posting a new item.");
		}
	};

	const updateItem = async (itemId: string, values: Partial<ItemRequest>): Promise<void> => {
		try {
			const itemData = reformatItemRequest(values);
			await api.patch(`/items/update-item/${itemId}/`, itemData);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during updating the item.");
		}
	};

	const deleteItem = async (itemId: string): Promise<void> => {
		try {
			await api.delete(`/items/delete-item/${itemId}`);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during deleting the item.");
		}
	};

	const buyItem = async (itemId: string): Promise<void> => {
		try {
			await api.post(`/items/buy/${itemId}/`);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during buying the item.");
		}
	};

	const getUserPayments = async (): Promise<PaymentResponse[]> => {
		try {
			const response = await api.get("/items/my-payments/");
			const payments: PaymentResponse[] = response.data.map((payment: any) => reformatPaymentResponse(payment));
			return payments;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching payments data.");
		}
	};

	const sendAssessmentRequest = async (assessmentRequest: AssessmentRequest): Promise<void> => {
		try {
			const assessmentData = reformatAssessmentRequest(assessmentRequest);
			await api.post("/evaluations/new/", assessmentData);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during posting a new assessment.");
		}
	};

	const getMyAssessments = async (): Promise<AssessmentResponse[]> => {
		try {
			const response = await api.get("/evaluations/my/");
			const assessments: AssessmentResponse[] = response.data.map((assessment: any) => reformatAssessmentResponse(assessment));
			return assessments;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching assessments data.");
		}
	};

	const getAssessmentRequestsOnMyProduct = async (productId: string): Promise<AssessmentResponse[]> => {
		try {
			const response = await api.get("/evaluations/product/", {
				params: { item_id: productId },
			});
			const assessments: AssessmentResponse[] = response.data.evaluation_requests.map((assessment: any) => reformatAssessmentResponse(assessment));
			return assessments;
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during fetching assessments data.");
		}
	};

	const rejectAssessment = async (assessmentId: string): Promise<void> => {
		try {
			await api.patch(`/evaluations/${assessmentId}/reject/`);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during rejecting the assessment.");
		}
	};

	const acceptAssessment = async (assessmentId: string): Promise<void> => {
		try {
			await api.patch(`/evaluations/${assessmentId}/accept/`);
		} catch (ex: any) {
			if (ex?.response?.data?.error?.message) throw new Error(ex.response.data.error.message);
			throw new Error("An unexpected error occurred during accepting the assessment.");
		}
	};

	return {
		signup,
		login,
		relogin,
		logout,
		getUserProfile,
		updateUser,
		getAllItems,
		getItemsToExplore,
		getItem,
		getUserProducts,
		postItem,
		updateItem,
		deleteItem,
		buyItem,
		getUserPayments,
		sendAssessmentRequest,
		getMyAssessments,
		getAssessmentRequestsOnMyProduct,
		rejectAssessment,
		acceptAssessment,
	};
};

function reformatItemResponse(item: any): ItemResponse {
	return {
		id: item.id.toString(),
		name: item.title,
		imgUrl: item.thumbnail_url || null,
		description: item.description,
		price: parseFloat(item.price),
		sellerId: item.seller_id.toString(),
		sellerName: item.seller_name,
		createdAt: item.created_at,
		isSold: item.is_sold,
		delegationState: item.delegation_state,
		evaluatorId: item.evaluator_id || null,
	};
}

function reformatItemRequest(item: Partial<ItemRequest>): any {
	return {
		title: item.name,
		// thumbnail_url: item.imgUrl || null,
		description: item.description,
		price: item.price,
		delegation_state: item.delegationState,
		is_visible: true,
	};
}

function reformatPaymentResponse(payment: any): PaymentResponse {
	return {
		id: payment.id.toString(),
		itemId: payment.item_id.toString(),
		userId: payment.buyer_id.toString(),
		itemName: payment.item_name,
		totalPrice: parseFloat(payment.total_price),
		createdAt: payment.created_at,
	};
}

function reformatAssessmentRequest(assessment: AssessmentRequest): any {
	return {
		item_id: assessment.itemId,
		name: assessment.name,
		message: assessment.message,
		price: assessment.price,
	};
}

function reformatAssessmentResponse(payment: any): AssessmentResponse {
	return {
		id: payment.id.toString(),
		itemId: payment.item_id.toString(),
		evaluatorId: payment.evaluator_id.toString(),
		name: payment.name,
		message: payment.message,
		price: parseFloat(payment.price),
		state: payment.state,
		createdAt: payment.created_at,
	};
}

export default useAPIDjango;
