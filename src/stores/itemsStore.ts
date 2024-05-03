import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ItemResponse as Item } from "../api/useAPI";

interface ItemsState {
	items: Item[];
}

interface ItemsActions {
	setItems: (items: Item[]) => void;
	getItem: (itemId: string | undefined) => Item | undefined;
	// addItem: (newItem: Item) => void;
	// updateItem: (updatedItem: Item) => void;
	// removeItem: (itemId: string) => void;
	// resetItems: () => void;
}

const useItemsStore = create(
	persist<ItemsState & ItemsActions>(
		(set, get) => ({
			items: [],
			setItems: (items) => set(() => ({ items: items })),
			getItem: (itemId) => {
				if (!itemId) return undefined;
				const items = get().items;
				return items.find((item) => item.id === itemId);
			},
			// addItem: (newItem) => set((state) => ({ items: [...state.items, newItem] })),
			// updateItem: (updatedItem) =>
			// 	set((state) => ({
			// 		items: state.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
			// 	})),
			// removeItem: (itemId) =>
			// 	set((state) => ({
			// 		items: state.items.filter((item) => item.id !== itemId),
			// 	})),
			// resetItems: () => set({ items: [] }),
		}),
		{
			name: "itemsStore",
			getStorage: () => sessionStorage,
		}
	)
);

export default useItemsStore;
