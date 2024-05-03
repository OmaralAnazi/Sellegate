import { useEffect, useState } from "react";
import useAPI, { AssessmentResponse as Assessment } from "../../api/useAPI";
import { Container, Table } from "react-bootstrap";
import { FcViewDetails } from "react-icons/fc";
import { MdPreview } from "react-icons/md";
import AssessmentModal from "../../components/AssessmentModal";
import { useNavigate } from "react-router-dom";

function EvaluatorDashboardPage() {
	const { getMyAssessments } = useAPI();
	const navigate = useNavigate();
	const [assessments, setAssessments] = useState<Assessment[] | null>(null);
	const [assessmentModal, setAssessmentModal] = useState<{ isShown: boolean; assessment: Assessment | null }>({
		isShown: false,
		assessment: null,
	});

	const handleViewItem = (itemId: string) => {
		navigate(`/item/${itemId}`);
	};

	useEffect(() => {
		getMyAssessments().then((assessments) => setAssessments(assessments));
	}, []);

	if (!assessments) return null;

	return (
		<Container className="my-3">
			<h1 className="text-center" style={{ fontSize: "2.25rem" }}>
				Your Assessments
			</h1>
			<Table className="my-4 text-center" style={{ fontSize: "1.25rem" }} striped bordered hover responsive>
				<thead>
					<tr>
						<th>Title</th>
						<th>Estimated Price</th>
						<th>Date</th>
						<th>State</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{assessments.map((assessment) => (
						<tr key={assessment.id}>
							<td>{assessment.name}</td>
							<td>{assessment.price} SAR</td>
							<td>{new Date(assessment.createdAt).toLocaleDateString()}</td>
							<td>{assessment.state}</td>
							<td className="d-flex justify-content-around">
								<MdPreview
									size={29}
									color="#2196f3"
									className={"pointer-on-hover"}
									onClick={() => {
										handleViewItem(assessment.itemId);
									}}
								/>
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
							</td>
						</tr>
					))}
					{assessments.length === 0 && (
						<tr>
							<td colSpan={5} className="text-center">
								You haven't send any requests...
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
		</Container>
	);
}

export default EvaluatorDashboardPage;
