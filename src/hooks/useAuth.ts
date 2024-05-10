import { useNavigate } from "react-router-dom";
import useAPI from "../api/useAPI";
import { toast } from "react-toastify";
import useAuthStore from "../stores/userStore";

const useAuth = () => {
	const { login, relogin, signup, logout } = useAPI();
	const setUser = useAuthStore((state) => state.setUser);
	const resetUser = useAuthStore((state) => state.resetUser);
	const navigate = useNavigate();

	const handleSignup = async (values: { username: string; email: string; password: string; confirmPassword: string }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			const { confirmPassword, ...signupData } = values;
			const userData = await signup(signupData);
			setUser(userData);
			// TODO: log user to intercom here...
			toast.success("Logged in successfully");
			navigate("/explore");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	const handleLogin = async (values: { email: string; password: string }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			const userData = await login(values);
			setUser(userData);
			// TODO: log user to intercom here...
			toast.success("Logged in successfully");
			navigate("/explore");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	const handleRelogin = async () => {
		try {
			const userData = await relogin();
			console.log(userData);
			setUser(userData);
			// TODO: relog user to intercom here...
		} catch (ex: any) {
			await handleLogout();
		}
	};

	const handleLogout = async () => {
		await logout();
		resetUser();
		navigate("/login");
	};

	return {
		handleSignup,
		handleLogin,
		handleRelogin,
		handleLogout,
	};
};

export default useAuth;
