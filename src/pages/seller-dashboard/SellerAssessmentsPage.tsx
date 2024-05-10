import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAPI, { AssessmentResponse as Assessment, ItemResponse } from "../../api/useAPI";
import { Container, Table } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import AssessmentModal from "../../components/AssessmentModal";
import CustomAlert from "../../components/CustomAlert";
import useSellerOperations from "../../hooks/useSellerOperations";

function SellerAssessmentsPage() {
	const { id: itemId } = useParams<{ id: string }>();
	const { rejectProductAssessment, acceptProductAssessment } = useSellerOperations();
	const [item, setItem] = useState<ItemResponse | null>();
	const [assessments, setAssessments] = useState<Assessment[]>([]);
	const { getItem, getAssessmentRequestsOnMyProduct } = useAPI();
	const [showConfirmRejection, setShowConfirmRejection] = useState(false);
	const [assessmentIdSelectedTobeRejected, setAssessmentIdSelectedTobeRejected] = useState("");
	const [showConfirmAcceptance, setShowConfirmAcceptance] = useState(false);
	const [assessmentIdSelectedTobeAccepted, setAssessmentIdSelectedTobeAccepted] = useState("");
	const navigate = useNavigate();
	const [assessmentModal, setAssessmentModal] = useState<{ isShown: boolean; assessment: Assessment | null }>({
		isShown: false,
		assessment: null,
	});

	const handleConfirmReject = () => {
		if (assessmentIdSelectedTobeRejected) {
			rejectProductAssessment(assessmentIdSelectedTobeRejected);
			setAssessments(assessments.filter((assessment) => assessment.id !== assessmentIdSelectedTobeRejected));
			setShowConfirmRejection(false);
		}
	};

	const handleConfirmAccept = () => {
		if (assessmentIdSelectedTobeAccepted) {
			acceptProductAssessment(assessmentIdSelectedTobeAccepted);
			navigate("/seller-dashboard");
			setShowConfirmAcceptance(false);
		}
	};

	useEffect(() => {
		if (!itemId) return;
		getItem(itemId).then((item) => setItem(item));
		getAssessmentRequestsOnMyProduct(itemId).then((assessments) => setAssessments(assessments));
	}, []);

	if (!item) return <h1 className="text-center my-3">Item not found...</h1>;

	return (
		<Container className="my-3">
			<h1 className="text-center" style={{ fontSize: "2.25rem" }}>
				Assessment Requests for {item.name}
			</h1>
			<Table className="my-4 text-center" style={{ fontSize: "1.25rem" }} striped bordered hover responsive>
				<thead>
					<tr>
						<th>Title</th>
						<th>Estimated Price</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{assessments.map((assessment) => (
						<tr key={assessment.id}>
							<td>{assessment.name}</td>
							<td>{assessment.price} SAR</td>
							<td>{new Date(assessment.createdAt).toLocaleDateString()}</td>
							<td className="d-flex justify-content-around">
								<FcViewDetails
									size={29}
									className={"pointer-on-hover"}
									onClick={() => {
										setAssessmentModal({
											isShown: true,
											assessment: assessment,
										});
									}}
								/>
								<MdCancel
									size={29}
									color={"red"}
									className={"pointer-on-hover"}
									onClick={() => {
										setShowConfirmRejection(true);
										setAssessmentIdSelectedTobeRejected(assessment.id);
									}}
								/>
								<FaCheckCircle
									size={25}
									color={"green"}
									className={"pointer-on-hover"}
									onClick={() => {
										setShowConfirmAcceptance(true);
										setAssessmentIdSelectedTobeAccepted(assessment.id);
									}}
								/>
							</td>
						</tr>
					))}
					{assessments.length === 0 && (
						<tr>
							<td colSpan={4} className="text-center">
								No new assessments found. Please come back later.
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			{assessmentModal.isShown && (
				<AssessmentModal
					assessment={assessmentModal.assessment}
					onHide={() => {
						setAssessmentModal({
							isShown: false,
							assessment: null,
						});
					}}
				/>
			)}
			<CustomAlert
				title="Reject Assessment"
				message="Are you sure you want to reject this assessment? You won't be able to access it later."
				show={showConfirmRejection}
				cancel={{ onClick: () => setShowConfirmRejection(false) }}
				confirm={{ onClick: handleConfirmReject, variant: "danger" }}
			/>
			<CustomAlert
				title="Accept Assessment"
				message="Are you sure you want to accept this assessment? You won't be able to edit your item after that, and all other assessment will be rejected automatically."
				show={showConfirmAcceptance}
				cancel={{ onClick: () => setShowConfirmAcceptance(false) }}
				confirm={{ onClick: handleConfirmAccept, variant: "success" }}
			/>
		</Container>
	);
}

export default SellerAssessmentsPage;
