import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import configRoutes from "./configRoutes";
import HomePage from "./pages/home/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import withAuth from "./components/withAuth";
import withoutAuth from "./components/withoutAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import withAuthAndEval from "./components/withAuthAndEval";

function App() {
	return (
		<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			<Router>
				<Header />
				<main style={{ flex: 1 }}>
					<Routes>
						{configRoutes.map(({ path, element, isAuthRequired, isEvalRequired }) => {
							const Page = isAuthRequired && isEvalRequired ? withAuthAndEval(element) : isAuthRequired ? withAuth(element) : withoutAuth(element);
							return <Route key={path} path={path} element={<Page />} />;
						})}
						{/* if page is not found: */}
						<Route path="*" element={<HomePage />} />
					</Routes>
				</main>
				<Footer />
				<ToastContainer autoClose={5000} newestOnTop={true} theme="dark" />
			</Router>
		</div>
	);
}

export default App;
