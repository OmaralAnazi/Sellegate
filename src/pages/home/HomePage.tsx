import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const hanldeStartBtn = () => {
		console.log("'Get Started' btn is clicked!");
		navigate("/explore");
	};

	return (
		<Container style={{ padding: "1rem" }}>
			<Row className="align-items-center">
				<Col md={6} className="text-md-left order-md-1">
					<h1 style={{ fontSize: "4rem" }}>Welcome to Sellegate</h1>
					<p style={{ fontSize: "1.5rem" }}>Discover the smart way to buy and sell. Get started or log in now for free and join the community of trusted buyers and sellers.</p>
					<Button variant="primary" style={{ fontSize: "1.5rem" }} onClick={hanldeStartBtn}>
						Explore Now
					</Button>
				</Col>
				<Col md={6} className="order-md-2 order-first">
					<img src="/images/home-hero.webp" style={{ maxWidth: "100%", height: "auto" }} />
				</Col>
			</Row>
		</Container>
	);
};

export default HomePage;
