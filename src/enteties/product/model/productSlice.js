import { createSlice } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "@/enteties/product/index.js";

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filtered: [],
    status: "idle",
    error: null,
    isLoading: false,
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.filtered = state.list.filter((product) => product.category_id === action.payload);
    },
    resetFilter: (state) => {
      state.filtered = state.list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
        state.filtered = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state) => {
        state.status = "success";
        state.isLoading = false;
      })
      .addCase(getProductById.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      });
  },
});

export const { filterByCategory, resetFilter } = productSlice.actions;
export default productSlice.reducer;
