/** @format */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.find((item) => item.id === newItem.id);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.push({ ...newItem, quantity: 1 });
			}
		},
		deleteFromCart: (state, action) => {
			const foundedItem = state.find(
				(item) => item.id === action.payload,
			);
			if (foundedItem.quantity === 1) {
				const index = state.findIndex(
					(item) => item.id === action.payload,
				);
				if (index !== -1) {
					state.splice(index, 1);
				}
			} else foundedItem.quantity -= 1;
		},
		increaseCount: (state, action) => {
			state.find((item) => item.id === action.payload).quantity += 1;
		},
		emptyCart: () => {
			return [];
		},
	},
});

export const { addToCart, deleteFromCart, increaseCount, emptyCart } =
	cartSlice.actions;
export default cartSlice.reducer;
