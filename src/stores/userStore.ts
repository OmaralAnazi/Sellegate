import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
	id: string | null;
	username: string | null;
	email: string | null;
	token: string | null;
	isEvaluator: boolean;
	evaluatorProfile: { bio: string } | null;
}

interface UserActions {
	setUser: (user: UserState) => void;
	updateBio: (bio: string) => void;
	resetUser: () => void;
}

const useAuthStore = create(
	persist<UserState & UserActions>(
		(set) => ({
			id: null,
			username: null,
			email: null,
			token: null,
			isEvaluator: false,
			evaluatorProfile: null,
			setUser: (user) => set({ ...user }),
			updateBio: (bio) =>
				set((state) => ({
					evaluatorProfile: { ...state.evaluatorProfile, bio },
				})),
			resetUser: () => set({ id: null, username: null, email: null, token: null, isEvaluator: false }),
		}),
		{
			name: "auth",
			getStorage: () => localStorage, // or sessionStorage
		}
	)
);

export default useAuthStore;
