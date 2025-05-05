import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload._id && p.size === action.payload.size
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }

      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },

    removeProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (p) => p._id === action.payload._id && p.size === action.payload.size
      );

      if (productIndex !== -1) {
        const product = state.products[productIndex];

        if (product.quantity > 1) {
          product.quantity -= 1;
          state.total -= product.price;
          state.quantity -= 1;
        } else {
          state.total -= product.price;
          state.quantity = Math.max(state.quantity - 1, 0);
          state.products.splice(productIndex, 1);
        }
      }
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (p) => p._id === action.payload._id && p.size === action.payload.size
      );

      if (product) {
        product.quantity += 1;
        state.quantity += 1;
        state.total += product.price;
      }
    },
  },
});

export const { addProduct, removeProduct, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
