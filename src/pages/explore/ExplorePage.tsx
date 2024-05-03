import { useEffect } from "react";
import useAPI from "../../api/useAPI";
import { Row, Container } from "react-bootstrap";
import ItemCard from "./ItemCard";
import useItemsStore from "../../stores/itemsStore";

const ExplorePage = () => {
	const { items, setItems } = useItemsStore((state) => ({
		items: state.items,
		setItems: state.setItems,
	}));
	const { getItemsToExplore } = useAPI();

	useEffect(() => {
		getItemsToExplore().then((items) => setItems(items));
	}, []);

	return (
		<Container className="my-3">
			<Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
				{items.length === 0 && <h1 className="text-center">No items found</h1>}
				{items?.map((item) => (
					<ItemCard key={item.id} item={item} />
				))}
			</Row>
		</Container>
	);
};

export default ExplorePage;
