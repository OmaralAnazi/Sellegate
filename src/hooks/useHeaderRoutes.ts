import useAuthStore from "../stores/userStore";
import configRoutes from "../configRoutes";

const useHeaderRoutes = () => {
	const { token, isEvaluator } = useAuthStore();
	const headerRoutes = configRoutes.filter((route) => route.showOnHeader);

	const shouldDisplayLink = (hideNavOnAuth: boolean, isEvalRequired: boolean) => (!token || !hideNavOnAuth) && (!isEvalRequired || isEvaluator);

	const mainNavs = headerRoutes.filter((route) => route.displayMainSection);
	const secondaryNavs = headerRoutes.filter((route) => !route.displayMainSection);

	return {
		mainNavs,
		secondaryNavs,
		shouldDisplayLink,
	};
};

export default useHeaderRoutes;
