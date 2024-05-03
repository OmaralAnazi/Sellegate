import { Card, Col, Badge } from "react-bootstrap";
import CustomButton from "../../components/CustomButton";
import useAPI, { DelegationStates, ItemResponse as Item } from "../../api/useAPI";
import { useNavigate } from "react-router-dom";
import ItemPlaceholderImg from "/images/item-placeholder.jpg";
import useAuthStore from "../../stores/userStore";
import { useEffect, useState } from "react";

interface ItemCardProps {
	item: Item;
}

function ItemCard({ item }: ItemCardProps) {
	const { getUserProfile } = useAPI();
	const { isEvaluator } = useAuthStore();
	const navigate = useNavigate();
	const [evaluatorName, setEvaluatorName] = useState("");

	const truncateText = (text: string, maxLength = 50) => {
		return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
	};

	const handleViewMore = () => {
		navigate(`/item/${item.id}`);
	};

	const handleEvaluationRequest = () => {
		navigate(`/evaluation-request/${item.id}`);
	};

	const handleViewEvaluatorProfile = () => {
		navigate(`/evaluator-profile/${item.evaluatorId}`);
	};

	useEffect(() => {
		if (!item || !item.evaluatorId) return;
		getUserProfile(item.evaluatorId).then((evaluator) => setEvaluatorName(evaluator.username));
	}, []);

	return (
		<Col>
			<Card style={{ height: "100%" }}>
				<div style={{ position: "relative" }}>
					<Card.Img variant="top" src={item.imgUrl ? item.imgUrl : ItemPlaceholderImg} alt={item.name} />
					{item.delegationState === DelegationStates.APPROVED && (
						<Badge className="pointer-on-hover" onClick={handleViewEvaluatorProfile} pill bg="success" style={{ fontSize: ".9rem", padding: ".5rem", position: "absolute", top: "10px", left: "10px" }}>
							Evaluated by {evaluatorName}
						</Badge>
					)}
				</div>
				<Card.Body className="d-flex flex-column">
					<Card.Title>{item.name}</Card.Title>
					<Card.Text>{truncateText(item.description)}</Card.Text>
					<Card.Text>{item.price} SAR</Card.Text>
					<div style={{ width: "100%", marginTop: "auto" }}>
						{isEvaluator && <CustomButton className="my-1" buttonText="Send Evaluation Request" onClick={handleEvaluationRequest} isDisable={item.delegationState !== DelegationStates.PENDING} />}
						<CustomButton buttonText="View More" onClick={handleViewMore} />
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default ItemCard;
