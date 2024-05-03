import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ExplorePage from "./pages/explore/ExplorePage";
import ItemDetailsPage from "./pages/item-details/itemDetailsPage";
import sellerDashboardPage from "./pages/seller-dashboard/sellerDashboardPage";
import EditItemPage from "./pages/edit-item/EditItemPage";
import PostItemPage from "./pages/post-item/PostItemPage";
import PaymentFromPage from "./pages/payment-from/PaymentFromPage";
import PaymentHistoryPage from "./pages/payment-history/PaymentHistoryPage";
import EvaluationRequestPage from "./pages/evaluation-request/EvaluationRequestPage";
import EvaluatorDashboardPage from "./pages/evaluator-dashboard/EvaluatorDashboardPage";
import SellerAssessmentsPage from "./pages/seller-dashboard/SellerAssessmentsPage";
import EvaluatorProfilePage from "./pages/evaluator-profile/EvaluatorProfilePage";

export default [
	{
		name: "Home",
		path: "/",
		isAuthRequired: false,
		isEvalRequired: false,
		showOnHeader: true,
		hideNavOnAuth: false,
		displayMainSection: true,
		element: HomePage,
	},
	{
		name: "Login",
		path: "/login",
		isAuthRequired: false,
		isEvalRequired: false,
		showOnHeader: true,
		hideNavOnAuth: true,
		displayMainSection: false,
		element: LoginPage,
	},
	{
		name: "Sign up",
		path: "/signup",
		isAuthRequired: false,
		isEvalRequired: false,
		showOnHeader: true,
		hideNavOnAuth: true,
		displayMainSection: false,
		element: SignupPage,
	},
	{
		name: "Profile",
		path: "/profile",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: true,
		hideNavOnAuth: false,
		displayMainSection: true,
		element: ProfilePage,
	},
	{
		name: "Explore",
		path: "/explore",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: true,
		hideNavOnAuth: false,
		displayMainSection: true,
		element: ExplorePage,
	},
	{
		name: "Item",
		path: "/item/:id",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: ItemDetailsPage,
	},
	{
		name: "Seller Dashboard",
		path: "/seller-dashboard",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: true,
		hideNavOnAuth: false,
		displayMainSection: true,
		element: sellerDashboardPage,
	},
	{
		name: "Edit Item",
		path: "/edit-item/:id",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: EditItemPage,
	},
	{
		name: "Post Item",
		path: "/post-item",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: PostItemPage,
	},
	{
		name: "Payment",
		path: "/payment/:id",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: PaymentFromPage,
	},
	{
		name: "Payment History",
		path: "/payment-history",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: PaymentHistoryPage,
	},
	{
		name: "Evaluation Request",
		path: "/evaluation-request/:id",
		isAuthRequired: true,
		isEvalRequired: true,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: EvaluationRequestPage,
	},
	{
		name: "Evaluator Dashboard",
		path: "/evaluator-dashboard",
		isAuthRequired: true,
		isEvalRequired: true,
		showOnHeader: true,
		hideNavOnAuth: false,
		displayMainSection: true,
		element: EvaluatorDashboardPage,
	},
	{
		name: "Product Assessments",
		path: "/seller-dashboard/:id/assessments",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: SellerAssessmentsPage,
	},
	{
		name: "Evaluator Profile",
		path: "/evaluator-profile/:id",
		isAuthRequired: true,
		isEvalRequired: false,
		showOnHeader: false,
		hideNavOnAuth: false,
		displayMainSection: false,
		element: EvaluatorProfilePage,
	},
];
