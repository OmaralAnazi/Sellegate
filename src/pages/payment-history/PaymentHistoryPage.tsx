import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import useAPI, { PaymentResponse as Payment } from "../../api/useAPI";

function PaymentHistoryPage() {
	const [payments, setPayments] = useState<Payment[] | null>(null);
	const { getUserPayments } = useAPI();

	useEffect(() => {
		getUserPayments().then((payments) => setPayments(payments));
	}, []);

	if (!payments) return null;

	return (
		<Container className="my-3">
			<h1 className="text-center" style={{ fontSize: "2.25rem" }}>
				Payment History
			</h1>
			<Table className="my-4 text-center" style={{ fontSize: "1.25rem" }} striped bordered hover responsive>
				<thead>
					<tr>
						<th>Item Name</th>
						<th>Price</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{payments.map((payment) => (
						<tr key={payment.id}>
							<td>{payment.itemName}</td>
							<td>{payment.totalPrice.toFixed(2)} SAR</td>
							<td>{new Date(payment.createdAt).toLocaleDateString()}</td>
						</tr>
					))}
					{payments.length === 0 && (
						<tr>
							<td colSpan={4} className="text-center">
								No payments found
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</Container>
	);
}

export default PaymentHistoryPage;
