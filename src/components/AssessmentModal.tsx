import { Modal, Button } from "react-bootstrap";
import { AssessmentResponse as Assessment } from "../api/useAPI";
import { useNavigate } from "react-router-dom";

interface AssessmentModalProps {
	assessment: Assessment | null;
	onHide: () => void;
}

function AssessmentModal({ assessment, onHide }: AssessmentModalProps) {
	const navigate = useNavigate();

	const handleViewProfile = () => {
		if (assessment) navigate(`/evaluator-profile/${assessment.evaluatorId}`);
	};

	if (!assessment) return null;

	return (
		<Modal show={true} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>{assessment.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<strong>Date: </strong>
				{new Date(assessment.createdAt).toLocaleDateString()}
				<br /> <br />
				<strong>Message: </strong>
				{assessment.message}
				<br /> <br />
				<strong>New Price: </strong>
				{assessment.price} SAR
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Close
				</Button>
				<Button variant="primary" onClick={handleViewProfile}>
					View Profile
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AssessmentModal;
