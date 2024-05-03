import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import useAPI from "../api/useAPI";
import useAuthStore from "../stores/userStore";

interface EditBioModalProps {
	bio: string;
	setShowBioModal: (newState: boolean) => void;
}

function EditBioModal({ bio, setShowBioModal }: EditBioModalProps) {
	const { updateUser } = useAPI();
	const { id: userId, updateBio } = useAuthStore();
	const [updatedBio, setUpdatedBio] = useState(bio);

	const handleConfirm = async () => {
		if (!userId) return;
		try {
			await updateUser(userId, { evaluatorProfile: { bio: updatedBio } });
			updateBio(updatedBio);
			toast.success("Bio updated successfully");
			setShowBioModal(false);
		} catch (ex: any) {
			toast.error(ex.message);
		}
	};

	return (
		<Modal show={true} onHide={() => setShowBioModal(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>Update your Bio</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<textarea className="form-control" value={updatedBio} onChange={(e) => setUpdatedBio(e.target.value)} style={{ minHeight: "100px" }} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setShowBioModal(false)}>
					Close
				</Button>
				<Button variant="primary" onClick={handleConfirm}>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditBioModal;
