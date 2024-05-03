import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/userStore";
import { toast } from "react-toastify";

function withAuth(WrappedComponent: any) {
	return function (props: any) {
		const navigate = useNavigate();
		const { token } = useAuthStore();

		React.useEffect(() => {
			if (!token) {
				toast.info("You've to login first");
				navigate("/login");
			}
		}, [token, navigate]);

		if (!token) {
			return null; // TODO: add kind of loading spinner
		}

		return <WrappedComponent {...props} />;
	};
}

export default withAuth;
