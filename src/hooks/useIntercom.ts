import useAuthStore from "../stores/userStore";

// TODO: refactor and refine the Intercom integration

function useIntercom() {
	const { id, username, email } = useAuthStore();

	const loginIntercom = () => {
		// @ts-ignore
		if (typeof window.Intercom === "function") {
			// @ts-ignore
			window.Intercom("boot", {
				app_id: "a4k8z66z",
				user_id: id,
				name: username,
				email: email,
			});
			// @ts-ignore
			window.Intercom("update", {
				user_id: id,
				name: username,
				email: email,
			});
		} else {
			console.error("Intercom script has not loaded yet.");
		}
	};

	const logoutIntercom = () => {
		// @ts-ignore
		if (typeof window.Intercom === "function") {
			// @ts-ignore
			window.Intercom("shutdown");
		} else {
			console.error("Intercom script has not loaded yet.");
		}
	};

	return {
		loginIntercom,
		logoutIntercom,
	};
}

export default useIntercom;
