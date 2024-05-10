import { useNavigate } from "react-router-dom";
import useAPI from "../api/useAPI";
import { toast } from "react-toastify";
import useAuthStore from "../stores/userStore";
import useIntercom from "./useIntercom";

const useAuth = () => {
	const { login, relogin, signup, logout } = useAPI();
	const { loginIntercom, logoutIntercom } = useIntercom();
	const setUser = useAuthStore((state) => state.setUser);
	const resetUser = useAuthStore((state) => state.resetUser);
	const navigate = useNavigate();

	const handleSignup = async (values: { username: string; email: string; password: string; confirmPassword: string }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		try {
			const { confirmPassword, ...signupData } = values;
			const userData = await signup(signupData);
			setUser(userData);
			loginIntercom();
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
			loginIntercom();
			console.log("test");
			toast.success("Logged in successfully");
			navigate("/explore");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	const handleRelogin = async () => {
		try {
			const userData = await relogin();
			setUser(userData);
			loginIntercom();
		} catch (ex: any) {
			await handleLogout();
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			logoutIntercom();
			resetUser();
			navigate("/login");
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	return {
		handleSignup,
		handleLogin,
		handleRelogin,
		handleLogout,
	};
};

export default useAuth;
