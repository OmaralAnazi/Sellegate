import { Navbar, Nav, Container } from "react-bootstrap";
import useHeaderRoutes from "../hooks/useHeaderRoutes";

const Header = () => {
	const { mainNavs, secondaryNavs, shouldDisplayLink } = useHeaderRoutes();

	const getNavsElements = (navs: any) => {
		return navs.map(
			({ name, path, hideNavOnAuth, isEvalRequired }: any) =>
				shouldDisplayLink(hideNavOnAuth, isEvalRequired) && (
					<Nav.Link className="mx-3" key={path} style={{ color: "#EBEAEB" }} href={path}>
						{name}
					</Nav.Link>
				)
		);
	};

	return (
		<Navbar data-bs-theme="dark" expand="lg" style={{ backgroundColor: "#1E1E1F" }}>
			<Container>
				<Navbar.Brand style={{ color: "white" }} href="/">
					Sellegate
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">{getNavsElements(mainNavs)}</Nav>
					<Nav>{getNavsElements(secondaryNavs)}</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
