import useAPIJsonServer from "./useAPI-JsonServer";
import useAPIDjango from "./useAPI-Django";

const USE_REAL_BACKEND = true;

const useAPI = USE_REAL_BACKEND ? useAPIDjango : useAPIJsonServer;

export interface SignupRequest {
	username: string;
	email: string;
	password: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	id: string;
	username: string;
	email: string;
	token: string;
	isEvaluator: boolean;
	evaluatorProfile: { bio: string }; // we can add more fields later...
}

export interface PaymentResponse {
	id: string;
	itemId: string;
	itemName: string;
	userId: string;
	totalPrice: number;
	createdAt: string;
}

export interface ItemRequest {
	name: string;
	imgUrl: string | null;
	description: string;
	price: number;
	delegationState: DelegationStates;

	isSold?: boolean; // This is temp solution, i should delete it when i integrate with the real backend
}

export interface ItemResponse {
	id: string;
	name: string;
	imgUrl: string | null; // change to thumbnailUrl
	description: string;
	price: number;
	sellerId: string;
	sellerName: string; // get form another api ...... user/id ??? <-- we may delete this
	createdAt: string;
	isSold: boolean;
	delegationState: DelegationStates;
	evaluatorId: string | null;
	// add eval information if delegationState is APPROVED
}

export interface AssessmentRequest {
	itemId: string;
	name: string;
	message: string;
	price: number;
}

export interface AssessmentResponse {
	id: string;
	itemId: string;
	evaluatorId: string;
	name: string;
	message: string;
	price: number;
	state: DelegationStates;
	createdAt: string;
}

export enum DelegationStates {
	INDEPENDENT = "Independent",
	PENDING = "Pending",
	APPROVED = "Approved",
	REJECTED = "Rejected",
}

export enum ItemStates {
	FOR_SALE = "For Sale",
	SOLD = "Sold",
}

export default useAPI;
