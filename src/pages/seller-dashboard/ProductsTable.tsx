import { useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { DelegationStates, ItemResponse as Item, ItemStates } from "../../api/useAPI";
import useSellerOperations from "../../hooks/useSellerOperations";
import CustomAlert from "../../components/CustomAlert";
import { useNavigate } from "react-router-dom";

type ProductsTableProps = {
	userProducts: Item[];
	setUserProducts: (state: Item[]) => void;
	handleEditItem: (itemId: string) => void;
};

const ProductsTable = ({ userProducts, handleEditItem, setUserProducts }: ProductsTableProps) => {
	const { deleteUserItem, arrangeProducts } = useSellerOperations();
	const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
	const [itemIdSelectedTobeDeleted, setItemIdSelectedTobeDeleted] = useState("");
	const navigate = useNavigate();
	const products = arrangeProducts(userProducts);

	const handleConfirmDelete = () => {
		if (itemIdSelectedTobeDeleted) {
			deleteUserItem(itemIdSelectedTobeDeleted);
			setUserProducts(userProducts.filter((product) => product.id !== itemIdSelectedTobeDeleted));
			setShowConfirmDeletion(false);
		}
	};

	const handleViewAssessments = async (productId: string) => {
		navigate(`/seller-dashboard/${productId}/assessments`);
	};

	return (
		<>
			<Table className="my-4 text-center" style={{ fontSize: "1.25rem" }} striped bordered hover responsive>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>State</th>
						<th>Receive Assessments</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>{product.price} SAR</td>
							<td>{product.isSold ? ItemStates.SOLD : ItemStates.FOR_SALE}</td>
							{product.delegationState === DelegationStates.PENDING && <td>Allowed</td>}
							{product.delegationState === DelegationStates.INDEPENDENT && <td>Not Allowed</td>}
							{product.delegationState === DelegationStates.APPROVED && <td>Accepted</td>}
							<td className="d-flex justify-content-around">
								<FaRegEdit
									size={25}
									color={!product.isSold && product.delegationState !== DelegationStates.APPROVED ? "#005A7A" : "gray"}
									className={!product.isSold && product.delegationState !== DelegationStates.APPROVED ? "pointer-on-hover" : ""}
									onClick={() => {
										if (product.isSold || product.delegationState === DelegationStates.APPROVED) return;
										handleEditItem(product.id);
									}}
								/>
								<FaCodePullRequest
									size={25}
									color={!product.isSold && product.delegationState === DelegationStates.PENDING ? "#005A7A" : "gray"}
									className={!product.isSold && product.delegationState === DelegationStates.PENDING ? "pointer-on-hover" : ""}
									onClick={() => {
										if (product.isSold || product.delegationState !== DelegationStates.PENDING) return;
										handleViewAssessments(product.id);
									}}
								/>
								<FaTrash
									size={25}
									color={!product.isSold ? "#D94745" : "gray"}
									className={!product.isSold ? "pointer-on-hover" : ""}
									onClick={() => {
										if (product.isSold) return;
										setItemIdSelectedTobeDeleted(product.id);
										setShowConfirmDeletion(true);
									}}
								/>
							</td>
						</tr>
					))}
					{products.length === 0 && (
						<tr>
							<td colSpan={5} className="text-center">
								No products found
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			<CustomAlert
				title="Delete Item"
				message="Are you sure you want to delete this item?"
				show={showConfirmDeletion}
				cancel={{ onClick: () => setShowConfirmDeletion(false) }}
				confirm={{ onClick: handleConfirmDelete, variant: "danger" }}
			/>
		</>
	);
};

export default ProductsTable;
