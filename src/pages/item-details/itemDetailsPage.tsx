import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import useItemsStore from "../../stores/itemsStore";
import CustomButton from "../../components/CustomButton";
import ItemPlaceholderImg from "/images/item-placeholder.jpg";
import useAuthStore from "../../stores/userStore";
import useAPI, { DelegationStates } from "../../api/useAPI";
import { useEffect, useState } from "react";

function ItemDetailsPage() {
	const { getUserProfile } = useAPI();
	const { id } = useParams<{ id: string }>();
	const { isEvaluator } = useAuthStore();
	const [evaluatorName, setEvaluatorName] = useState("");
	const getItem = useItemsStore((state) => state.getItem);
	const item = getItem(id);
	const navigate = useNavigate();

	const handleBuy = () => {
		navigate(`/payment/${id}`);
	};

	const handleEvaluationRequest = () => {
		navigate(`/evaluation-request/${id}`);
	};

	const handleViewEvaluatorProfile = () => {
		if (item && item.evaluatorId) navigate(`/evaluator-profile/${item.evaluatorId}`);
	};

	useEffect(() => {
		if (!item || !item.evaluatorId) return;
		getUserProfile(item.evaluatorId).then((evaluator) => setEvaluatorName(evaluator.username));
	}, []);

	if (!item)
		return (
			<Container className="my-3 text-center">
				<h1>No item found</h1>
				<p style={{ fontSize: "1.5rem" }}>It is possible the item you are trying to access does not exist, is deleted, or is already sold by someone.</p>
			</Container>
		);

	return (
		<Container className="my-3">
			<Row className="justify-content-md-center">
				<Col md={16}>
					<Card>
						<Row>
							<Col md={6}>
								<div style={{ position: "relative" }}>
									<Card.Img variant="top" src={item.imgUrl ? item.imgUrl : ItemPlaceholderImg} alt={item.name} />
									{item.delegationState === DelegationStates.APPROVED && (
										<Badge
											className="pointer-on-hover"
											onClick={handleViewEvaluatorProfile}
											pill
											bg="success"
											style={{ fontSize: ".9rem", padding: ".5rem", position: "absolute", top: "10px", left: "10px" }}
										>
											Evaluated by {evaluatorName}
										</Badge>
									)}
								</div>
							</Col>
							<Col md={6}>
								<Card.Body style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
									<div>
										<Card.Title style={{ fontSize: "1.75rem" }}>{item.name}</Card.Title>
										<Card.Text>{item.description}</Card.Text>
									</div>
									<ListGroup variant="flush">
										<ListGroup.Item style={{ padding: "0.5rem 0" }}>
											<strong>Price:</strong> {item.price.toFixed(2)} SAR
										</ListGroup.Item>
										<ListGroup.Item style={{ padding: "0.5rem 0" }}>
											<strong>Seller:</strong> {item.sellerName}
										</ListGroup.Item>
										<ListGroup.Item style={{ padding: "0.5rem 0" }}>
											<strong>Posted At:</strong> {new Date(item.createdAt).toLocaleDateString()}
										</ListGroup.Item>
									</ListGroup>
									<div>
										{isEvaluator && (
											<CustomButton className="my-1" buttonText="Send Evaluation Request" onClick={handleEvaluationRequest} isDisable={item.delegationState !== DelegationStates.PENDING} />
										)}
										{!item.isSold ? <CustomButton buttonText={`Buy with ${item.price} SAR`} onClick={handleBuy} /> : <CustomButton buttonText={`Item is Sold`} onClick={undefined} isDisable={true} />}
									</div>
								</Card.Body>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default ItemDetailsPage;
