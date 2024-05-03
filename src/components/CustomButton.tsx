import { useState, ElementType } from "react";
import { Button, Spinner } from "react-bootstrap";

interface CustomButtonProps {
	className?: string;
	variant?: string;
	buttonText: string;
	onClick: any;
	Icon?: ElementType;
	expand?: boolean;
	isDisable?: boolean;
}

const CustomButton = ({ className = "", variant = "primary", buttonText, onClick, Icon, expand = true, isDisable = false }: CustomButtonProps) => {
	const [loading, setLoading] = useState(false);

	const baseStyle: React.CSSProperties = {
		borderRadius: "5px",
		display: !loading && Icon ? "flex" : "",
		justifyContent: "space-between",
		alignItems: "center",
	};

	const buttonStyle = expand ? { ...baseStyle, width: "100%" } : baseStyle;

	const runAction = async () => {
		setLoading(true);
		await onClick();
		setLoading(false);
	};

	return (
		<Button className={className} variant={variant} onClick={runAction} disabled={loading || isDisable} style={buttonStyle}>
			{loading ? (
				<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
			) : (
				<>
					{buttonText}
					{Icon && <Icon />}
				</>
			)}
		</Button>
	);
};

export default CustomButton;
