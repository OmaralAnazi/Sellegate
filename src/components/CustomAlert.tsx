import { Modal, Button } from "react-bootstrap";

interface CustomAlertProps {
	title: string;
	message: string;
	show: boolean;
	cancel: {
		variant?: string;
		buttonText?: string;
		onClick: () => void;
	};
	confirm?: {
		variant?: string;
		buttonText?: string;
		onClick: () => void;
	};
}

function CustomAlert({ title, message, show, cancel, confirm }: CustomAlertProps) {
	const cancelText = cancel.buttonText || "No";
	const confirmText = confirm?.buttonText || "Yes";

	const cancelVariant = cancel.variant || "secondary";
	const confirmVariant = confirm?.variant || "primary";

	return (
		<Modal show={show} onHide={cancel.onClick} centered>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant={cancelVariant} onClick={cancel.onClick}>
					{cancelText}
				</Button>
				{confirm && (
					<Button variant={confirmVariant} onClick={confirm.onClick}>
						{confirmText}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default CustomAlert;
