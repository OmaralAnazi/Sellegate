import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/userStore";

function withoutAuth(WrappedComponent: any) {
	return function (props: any) {
		const navigate = useNavigate();
		const { token } = useAuthStore();

		React.useEffect(() => {
			if (token) {
				navigate("/home");
			}
		}, [token, navigate]);

		if (token) {
			return null; // TODO: add kind of loading spinner
		}

		return <WrappedComponent {...props} />;
	};
}

export default withoutAuth;
