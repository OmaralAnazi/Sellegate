import axios from "axios";
import useAuthStore from "../stores/userStore";
import { AssessmentRequest, AssessmentResponse, AuthResponse, ItemRequest, ItemResponse, LoginRequest, SignupRequest, PaymentResponse, DelegationStates } from "./useAPI";

const getNewId = (endpoint: string) => `${endpoint}_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

const useAPIJsonServer = () => {
	const { id: userId, username } = useAuthStore();
	const API_URL = import.meta.env.VITE_API_URL_JSON_SERVER; 

	const signup = async (signupData: SignupRequest): Promise<AuthResponse> => {
		try {
			// Simulate token generation - in production, this should be handled by the server securely
			const fakeToken = `token-${Math.random().toString(36).substr(2, 9)}`;

			const response = await axios.post(API_URL + "/users", {
				username: signupData.username,
				email: signupData.email,
				password: signupData.password,
				isEvaluator: false,
				token: fakeToken, // Adding a fake token for the sake of the example
			});

			return response.data;
		} catch (ex: any) {
			throw new Error("Signup failed: " + ex.message);
		}
	};

	const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
		try {
			const response = await axios.get(API_URL + "/users");
			const users = response.data;

			const user = users.find((user: any) => user.email === loginData.email && user.password === loginData.password);

			if (user) return user;
			else throw new Error("Invalid email or password");
		} catch (ex) {
			throw ex;
		}
	};

	const relogin = async (): Promise<AuthResponse> => {
		try {
			const response = await axios.get(`${API_URL}/users/${userId}`);
			return response.data;
		} catch (ex: any) {
			throw ex;
		}
	};

	const logout = async (): Promise<void> => {
		// nothing to do for this fake backend...
	};

	const getUserProfile = async (userId: string): Promise<AuthResponse> => {
		try {
			const response = await axios.get(`${API_URL}/users/${userId}`);
			return response.data;
		} catch (ex: any) {
			throw ex;
		}
	};

	const updateUser = async (userId: string, values: Partial<AuthResponse>): Promise<void> => {
		try {
			await axios.patch(`${API_URL}/users/${userId}`, values);
		} catch (ex: any) {
			throw ex;
		}
	};

	const getAllItems = async (): Promise<ItemResponse[]> => {
		try {
			const response = await axios.get(API_URL + "/items");
			return response.data;
		} catch (ex) {
			throw ex;
		}
	};

	const getItemsToExplore = async (): Promise<ItemResponse[]> => {
		try {
			const items = await getAllItems();
			return items.filter((item) => item.sellerId !== userId && !item.isSold);
		} catch (ex) {
			throw ex;
		}
	};

	const getItem = async (itemId: string): Promise<ItemResponse> => {
		try {
			const response = await axios.get(API_URL + "/items");
			return response.data.find((item: ItemResponse) => item.id === itemId);
		} catch (ex) {
			throw ex;
		}
	};

	const getUserProducts = async (): Promise<ItemResponse[]> => {
		try {
			const items = await getAllItems();
			return items.filter((item) => item.sellerId === userId);
		} catch (ex) {
			throw ex;
		}
	};

	const postItem = async (item: ItemRequest): Promise<void> => {
		if (!(userId && username)) return;

		const id = getNewId("item");
		const newItem: ItemResponse = {
			...item,
			id,
			sellerId: userId,
			sellerName: username,
			createdAt: new Date().toISOString(),
			isSold: false,
			evaluatorId: null,
		};
		try {
			await axios.post(API_URL + "/items", newItem);
		} catch (ex) {
			throw ex;
		}
	};

	const updateItem = async (itemId: string, values: Partial<ItemRequest>): Promise<void> => {
		try {
			await axios.patch(`${API_URL}/items/${itemId}`, values);
		} catch (ex: any) {
			throw ex;
		}
	};

	const deleteItem = async (itemId: string): Promise<void> => {
		try {
			await axios.delete(`${API_URL}/items/${itemId}`);
		} catch (ex: any) {
			throw ex;
		}
	};

	const buyItem = async (itemId: string): Promise<void> => {
		try {
			if (!userId) throw new Error("User not found");

			const item = await getItem(itemId);
			const newPayment: PaymentResponse = {
				id: getNewId("payment"),
				itemId: itemId,
				userId: userId,
				itemName: item.name,
				totalPrice: item.price,
				createdAt: new Date().toISOString(),
			};
			await axios.post(`${API_URL}/payments`, newPayment);
			await updateItem(itemId, { isSold: true });
		} catch (ex: any) {
			throw ex;
		}
	};

	const getUserPayments = async (): Promise<PaymentResponse[]> => {
		try {
			if (!userId) throw new Error("User not found");

			const response = await axios.get(`${API_URL}/payments`);
			return response.data.filter((payment: PaymentResponse) => payment.userId === userId);
		} catch (ex: any) {
			throw ex;
		}
	};

	const sendAssessmentRequest = async (assessmentRequest: AssessmentRequest): Promise<void> => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (!userId) throw new Error("User not found");

			const newAssessment: AssessmentResponse = {
				id: getNewId("assessments"),
				itemId: assessmentRequest.itemId,
				evaluatorId: userId,
				name: assessmentRequest.name,
				message: assessmentRequest.message,
				price: assessmentRequest.price,
				state: DelegationStates.PENDING,
				createdAt: new Date().toISOString(),
			};
			await axios.post(`${API_URL}/assessments`, newAssessment);
		} catch (ex: any) {
			throw ex;
		}
	};

	const getMyAssessments = async (): Promise<AssessmentResponse[]> => {
		try {
			if (!userId) throw new Error("User not found");

			const response = await axios.get(`${API_URL}/assessments`);
			return response.data.filter((assessment: AssessmentResponse) => assessment.evaluatorId === userId);
		} catch (ex: any) {
			throw ex;
		}
	};

	const getAssessmentRequestsOnMyProduct = async (productId: string): Promise<AssessmentResponse[]> => {
		try {
			if (!userId) throw new Error("User not found");

			const products = await getUserProducts();
			const productsIds: string[] = products.map((product) => product.id);
			if (!productsIds.includes(productId)) throw new Error("That's not your product");

			const response = await axios.get(`${API_URL}/assessments`);
			return response.data.filter((assessment: AssessmentResponse) => assessment.itemId === productId && assessment.state === DelegationStates.PENDING);
		} catch (ex: any) {
			throw ex;
		}
	};

	const rejectAssessment = async (assessmentId: string): Promise<void> => {
		try {
			await axios.patch(`${API_URL}/assessments/${assessmentId}`, { state: DelegationStates.REJECTED });
		} catch (ex: any) {
			throw ex;
		}
	};

	const acceptAssessment = async (assessmentId: string): Promise<void> => {
		try {
			const response = await axios.get(`${API_URL}/assessments/${assessmentId}`);
			const assessment: AssessmentResponse = response.data;

			const assessments = await getAssessmentRequestsOnMyProduct(assessment.itemId);
			assessments.forEach(async (assessment) => {
				await rejectAssessment(assessment.id);
			});

			await axios.patch(`${API_URL}/assessments/${assessmentId}`, { state: DelegationStates.APPROVED });
			await axios.patch(`${API_URL}/items/${assessment.itemId}`, { delegationState: DelegationStates.APPROVED, price: assessment.price });
		} catch (ex: any) {
			throw ex;
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

export default useAPIJsonServer;
