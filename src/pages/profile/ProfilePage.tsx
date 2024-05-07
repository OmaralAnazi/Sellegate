import useAuth from "../../hooks/useAuth";
import { Image, Container, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { FaSignOutAlt, FaHistory } from "react-icons/fa";
import useAuthStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { AuthResponse as User } from "../../api/useAPI";
import { useState } from "react";
import EditBioModal from "../../components/EditBioModal";
import CustomAlert from "../../components/CustomAlert";

interface ProfilePageProps {
	userToPreview?: User;
}

function ProfilePage({ userToPreview }: ProfilePageProps) {
	const { username, email, isEvaluator, evaluatorProfile } = useAuthStore();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const { handleLogout } = useAuth();
	const [showBioModal, setShowBioModal] = useState(false);
	const imagePlaceHolder = "/images/user-placeholder.png";
	const navigate = useNavigate();

	const handlePaymentHistory = () => {
		navigate("/payment-history");
	};

	const renderTooltip = (props: any) => (
		<Tooltip id="button-tooltip" {...props}>
			Verified Evaluator by Sellegate
		</Tooltip>
	);

	return (
		<Container className="mt-5 border p-3 shadow text-center" style={{ maxWidth: "720px", borderRadius: "10px", position: "relative" }}>
			{!userToPreview && (
				<div className="position-absolute top-0 start-0 pt-3 ps-3 d-flex flex-column align-items-start" style={{ fontSize: "1.25rem" }}>
					<div className="pointer-on-hover" onClick={() => setShowLogoutModal(true)}>
						<FaSignOutAlt color="red" /> Log out
					</div>
					<div className="pointer-on-hover" onClick={handlePaymentHistory}>
						<FaHistory color="#005A7A" /> Payment History
					</div>
				</div>
			)}
			<Image src={imagePlaceHolder} roundedCircle style={{ width: "300px", height: "300px" }} />
			<h3>
				{((!userToPreview && isEvaluator) || (userToPreview && userToPreview.isEvaluator)) && (
					<OverlayTrigger placement="top" overlay={renderTooltip}>
						<span>
							<MdVerified color="#2196f3" />{" "}
						</span>
					</OverlayTrigger>
				)}

				{userToPreview?.username || username}
			</h3>
			<p className="text-muted">{userToPreview?.email || email}</p>
			{!userToPreview && !isEvaluator && (
				<p>
					If you want to upgrade to Evaluator. Please <a href="#">click here</a> and fill out the form.
				</p>
			)}
			{userToPreview && <p style={{ fontSize: "1.15rem" }}>{userToPreview.evaluatorProfile.bio}</p>}
			{!userToPreview && isEvaluator && (
				<>
					{evaluatorProfile?.bio ? (
						<p className="text-center m-auto" style={{ width: "70%", fontSize: "1.15rem" }}>
							{evaluatorProfile?.bio}
						</p>
					) : (
						<p className="text-center m-auto" style={{ width: "70%", fontSize: "1.15rem", color: "gray" }}>
							This text serves as a placeholder for your biography. Please click the button below to write a bio, helping other users to trust and know more about you.
						</p>
					)}
					<br />
					<Button onClick={() => setShowBioModal(true)}>Edit your Bio</Button>
				</>
			)}
			{showBioModal && evaluatorProfile && <EditBioModal bio={evaluatorProfile.bio} setShowBioModal={setShowBioModal} />}
			<CustomAlert
				title="Log out"
				message="Are you sure you want to log out of this account?"
				show={showLogoutModal}
				cancel={{ onClick: () => setShowLogoutModal(false) }}
				confirm={{
					variant: "danger",
					onClick: () => {
						handleLogout();
						setShowLogoutModal(false);
				}}}
			/>
		</Container>
	);
}

export default ProfilePage;
