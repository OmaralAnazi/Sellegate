import { useParams } from "react-router-dom";
import useAPI, { AuthResponse as User } from "../../api/useAPI";
import { useEffect, useState } from "react";
import ProfilePage from "../profile/ProfilePage";

function EvaluatorProfilePage() {
	const { id } = useParams<{ id: string }>();
	const { getUserProfile } = useAPI();
	const [evaluator, setEvaluator] = useState<User | null>(null);

	useEffect(() => {
		if (!id) return;
		getUserProfile(id).then((evaluator) => setEvaluator(evaluator));
	}, []);

	if (!evaluator) return null;

	return <ProfilePage userToPreview={evaluator} />;
}

export default EvaluatorProfilePage;
