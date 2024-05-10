import { Container } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import ProductsTable from "./ProductsTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAPI, { ItemResponse as Item } from "../../api/useAPI";

function SellerDashboardPage() {
	const { getUserProducts } = useAPI();
	const [userProducts, setUserProducts] = useState<Item[]>([]);
	const navigate = useNavigate();

	const handleEditItem = (itemId: string) => {
		navigate(`/edit-item/${itemId}`);
	};

	const hanldePostItem = () => {
		navigate(`/post-item`);
	};

	useEffect(() => {
		try {
			getUserProducts().then((items) => setUserProducts(items));
		} catch (ex: any) {}
	}, []);

	return (
		<Container className="my-3">
			<h1 className="text-center" style={{ fontSize: "2.25rem" }}>
				Seller Dashboard
			</h1>
			<ProductsTable userProducts={userProducts} setUserProducts={setUserProducts} handleEditItem={handleEditItem} />
			<div className={`my-3 text-center d-flex flex-column align-items-center ${!userProducts.length && "my-5"}`}>
				<p style={{ fontSize: "1.5rem" }}>Post a new item to Sellegate</p>
				<FaPlusCircle className="pointer-on-hover" color="green" size={35} onClick={hanldePostItem} />
			</div>
		</Container>
	);
}

export default SellerDashboardPage;
