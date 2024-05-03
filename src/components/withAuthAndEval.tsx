import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/userStore";
import { toast } from "react-toastify";

function withAuthAndEval(WrappedComponent: any) {
	return function (props: any) {
		const navigate = useNavigate();
		const { token, isEvaluator } = useAuthStore();

		React.useEffect(() => {
			if (!token) {
				toast.info("You've to login first");
				navigate("/login");
			}
			if (!isEvaluator) {
				toast.info("Your're not an evaluator");
				navigate("/explore");
			}
		}, [token, isEvaluator, navigate]);

		if (!token || !isEvaluator) {
			return null; // TODO: add kind of loading spinner
		}

		return <WrappedComponent {...props} />;
	};
}

export default withAuthAndEval;
