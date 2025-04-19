import { createSlice } from "@reduxjs/toolkit";
import { saveStateToLocalStorage } from "@/shared/lib/localStorage.js";
import {
  changeItemQuantity,
  getUserCart,
  addProductToCart,
  deleteProductFromCart,
} from "@/enteties/cart/api/api.js";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isLoading: false,
    status: "idle",
  },
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.isLoading = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;

        let newCart = [...state.cart];
        const found = state.cart.find(
          (item) => item.id === action.payload.id && item.size === action.payload.size,
        );
        if (found) {
          newCart = newCart.map((item) =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          );
        } else {
          newCart.push({ ...action.payload, quantity: action.payload.quantity });
        }

        state.cart = newCart;
        saveStateToLocalStorage(state);
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      })
      .addCase(changeItemQuantity.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(changeItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
        const { product_id, quantity } = action.payload;
        state.cart = state.cart.map((item) =>
          item.product_id === product_id ? { ...item, quantity } : item,
        );
        saveStateToLocalStorage(state);
      })
      .addCase(changeItemQuantity.rejected, (state) => {
        state.isLoading = false;
        state.status = "failed";
      })
      .addCase(deleteProductFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";

        const { product_id, size } = action.payload;

        // Удаляем элемент с тем же product_id и размером
        state.cart = state.cart.filter(
          (cart_item) => cart_item.product_id !== product_id || cart_item.size !== size,
        );

        saveStateToLocalStorage(state);
      })
      .addCase(deleteProductFromCart.rejected, (state) => {
        state.isLoading = false;
        state.status = "failed";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
